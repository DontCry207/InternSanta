package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.api.request.MemberRegistReq;
import com.dontcry.internsanta.common.exception.adventcalendar.AdventCalendarNotFoundException;
import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.member.MemberCoinNegativeException;
import com.dontcry.internsanta.common.exception.member.MemberEmailDuplicationException;
import com.dontcry.internsanta.common.exception.member.MemberNotFoundException;
import com.dontcry.internsanta.common.exception.member.MemberTopUpdateException;
import com.dontcry.internsanta.db.entity.AdventCalendar;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.MemberSeal;
import com.dontcry.internsanta.db.entity.RefreshToken;
import com.dontcry.internsanta.db.repository.AdventCalendarRepository;
import com.dontcry.internsanta.db.repository.MemberRepository;
import com.dontcry.internsanta.db.repository.MemberSealRepository;
import com.dontcry.internsanta.db.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    @Autowired
    AdventCalendarRepository adventCalendarRepository;

    @Autowired
    MemberSealRepository memberSealRepository;

    @Override
    public Member getMemberByMemberEmail(String memberEmail) {
        Member member = memberRepository.findByMemberEmail(memberEmail).orElseThrow(() -> new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND));
        return member;
    }

    @Override
    public int updateMemberCoin(Member member, int memberCoin) {
        // 보유한 코인보다 많이 사용 시
        if (member.getMemberCoin() + memberCoin < 0)
            throw new MemberCoinNegativeException("보유 중인 코인보다 사용하는 코인이 많습니다.",ErrorCode.MEMBER_COIN_ERROR);
        member.updateMemberCoin(memberCoin);
        memberRepository.save(member);
        return member.getMemberCoin();
    }

    @Override
    public int updateMemberPet(Member member, int memberPet) {
        member.updateMemberPet(memberPet);
        memberRepository.save(member);
        return member.getMemberPet();
    }

    @Override
    public List<Integer> adventChulCheck(Member member) {
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        int todayDate = LocalDateTime.now().getDayOfMonth();
        List<AdventCalendar> adventCalendarList = adventCalendarRepository.findAllByMember(member).orElseThrow(()-> new AdventCalendarNotFoundException("advent calendar not found", ErrorCode.ADVENT_CALENDAR_NOT_FOUND));

        return null;
    }

    @Override
    public Member updateMemberChpater(Member member) {
        member.updateMemberProgress(member.getMemberChapter() + 1, 0);
        memberRepository.save(member);
        return member;
    }

    @Override
    public Member updateMemberCheckpoint(Member member) {
        member.updateMemberProgress(member.getMemberChapter(), member.getMemberCheckpoint() + 1);
        memberRepository.save(member);
        return member;
    }

    @Override
    public Member registerMember(MemberRegistReq memberInfo) {

       if (memberRepository.findByMemberEmail(memberInfo.getMemberEmail()).orElse(null) != null) {
           throw new MemberEmailDuplicationException("email duplication",ErrorCode.EMAIL_DUPLICATION);
       }

        MemberSeal memberSeal = MemberSeal.builder()
                .build();

        memberSealRepository.save(memberSeal);

        Member member = Member.builder()
                .memberEmail(memberInfo.getMemberEmail())
                .memberPwd(memberInfo.getMemberPwd())
                .memberNickname(memberInfo.getMemberNickname())
                .memberGender(memberInfo.getMemberGender())
                .memberSeal(memberSeal)
                .build();

        memberRepository.save(member);

        return member;
    }

    @Override
    public void registerRefreshToken(Member member, String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByMemberMemberId(member.getMemberId())
                .orElse(null);

        if (refreshToken != null) {
            refreshToken.updateRefreshToken(token);
        } else {
            refreshToken = RefreshToken.builder()
                    .refreshToken(token)
                    .member(member)
                    .build();
        }
        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public Member getMemberByEmailAndPwd(String memberEmail, String memberPwd) {

        Member member = memberRepository.findByMemberEmail(memberEmail).orElseThrow(() -> new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND));

        if(!member.getMemberPwd().equals(memberPwd))
            throw new MemberNotFoundException("비밀번호가 틀립니다", ErrorCode.MEMBER_NOT_FOUND);

        return member;
    }

    @Override
    public String updateMemberTop(List<MultipartFile> memberTopList, Member member) throws IOException {
        if (memberTopList.size() != 2) {
            throw new MemberTopUpdateException("이미지 파일의 개수가 2개가 아닙니다.", ErrorCode.MEMBER_TOP_IMAGE_ERROR);
        }
        Long memberId = member.getMemberId();
        // MultipartFIle -> ByteArray 변환
        ByteArrayResource frontImg = new ByteArrayResource(memberTopList.get(1).getBytes()) {
            // 기존 ByteArrayResource의 getFilename 메서드 override
            @Override
            public String getFilename() {
                return "front" + memberId + ".jpg";
            }
        };
        ByteArrayResource backImg = new ByteArrayResource(memberTopList.get(0).getBytes()) {
            // 기존 ByteArrayResource의 getFilename 메서드 override
            @Override
            public String getFilename() {
                return "back" + memberId + ".jpg";
            }
        };
        // Header MediaType 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("front", frontImg);
        body.add("back", backImg);
        body.add("member", memberId);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        String url = "http://localhost:8000/api/v2/cloth/top/";
        // 2. RestTemplate 객체를 생성합니다.
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        if (response.getStatusCode() != HttpStatus.OK)
            throw new MemberTopUpdateException("상의 업데이트 중 에러가 발생했습니다.", ErrorCode.MEMBER_TOP_UPDATE_ERROR);
        String memberTopUrl = response.getBody();
        memberTopUrl = memberTopUrl.substring(1, memberTopUrl.length() - 1); // " " 자르기
        member.updateMemberTop(memberTopUrl);
        memberRepository.save(member);
        return memberTopUrl;

    }
}
