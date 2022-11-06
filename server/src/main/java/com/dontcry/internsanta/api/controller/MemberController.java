package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.request.*;
import com.dontcry.internsanta.api.response.*;
import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.common.JwtAuthenticationUtil;
import com.dontcry.internsanta.common.JwtTokenUtil;
import com.dontcry.internsanta.common.auth.MemberDetails;
import com.dontcry.internsanta.common.model.response.BaseResponseBody;
import com.dontcry.internsanta.db.entity.Member;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(value = "멤버 API", tags = {"Member"})
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

    @PatchMapping("/coin")
    public ResponseEntity<MemberCoinRes> updateMemberCoin(@RequestBody MemberCoinUpdateReq memberCoinUpdateReq, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        int memberCoin = memberService.updateMemberCoin(member, memberCoinUpdateReq.getMemberCoin());
        return ResponseEntity.status(200).body(MemberCoinRes.of(memberCoin));
    }

    @PatchMapping("/pet")
    public ResponseEntity<?> updateMemberPet(@RequestBody MemberPetUpdateReq memberPetUpdateReq, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        int memberPet = memberService.updateMemberPet(member, memberPetUpdateReq.getMemberPet());
        return ResponseEntity.status(200).body(MemberPetRes.of(memberPet));
    }

    @PatchMapping("/advent")
    public ResponseEntity<MemberAdventCalendarListRes> adventChulCheck(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        List<Integer> memberAdventCalendarList = new ArrayList<>();
        memberService.adventChulCheck(member);


        return ResponseEntity.status(200).body(MemberAdventCalendarListRes.of(memberAdventCalendarList));
    }

    @PostMapping
    public ResponseEntity<BaseResponseBody> registerMember(@RequestBody MemberRegistReq memberRegistReq) {

        Member member = memberService.registerMember(memberRegistReq);

        Map<String, String> tokens = JwtTokenUtil.generateTokenSet(member.getMemberEmail());
        memberService.registerRefreshToken(member, tokens.get("refreshToken"));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> getMemberByLogin(@RequestBody MemberLoginReq memberLoginReq) {

        Member member = memberService.getMemberByEmailAndPwd(memberLoginReq.getMemberEmail(), memberLoginReq.getMemberPwd());

        Map<String, String> tokens = JwtTokenUtil.generateTokenSet(member.getMemberEmail());
        memberService.registerRefreshToken(member, tokens.get("refreshToken"));

        return ResponseEntity.status(200).body(MemberInfoRes.of(member, tokens));
    }

    @PatchMapping("/chapter")
    public ResponseEntity<MemberProgressRes> updateMemberChapter(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Member updateMember = memberService.updateMemberChpater(member);
        return ResponseEntity.status(200).body(MemberProgressRes.of(updateMember));
    }

    @PatchMapping("/checkpoint")
    public ResponseEntity<MemberProgressRes> updateMemberCheckpoint(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Member updateMember = memberService.updateMemberCheckpoint(member);
        return ResponseEntity.status(200).body(MemberProgressRes.of(updateMember));
    }

    @PatchMapping("/top")
    public ResponseEntity<?> updateMemberTop(@RequestBody List<MultipartFile> memberTopList, @ApiIgnore Authentication authentication) throws IOException {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        // MultipartFIle -> ByteArray 변환
        ByteArrayResource frontImg = new ByteArrayResource(memberTopList.get(0).getBytes()) {
            // 기존 ByteArrayResource의 getFilename 메서드 override
            @Override
            public String getFilename() {
                return "front" + member.getMemberId() + ".jpg";
            }
        };
        ByteArrayResource backImg = new ByteArrayResource(memberTopList.get(1).getBytes()) {
            // 기존 ByteArrayResource의 getFilename 메서드 override
            @Override
            public String getFilename() {
                return "back" + member.getMemberId() + ".jpg";
            }
        };
        // Header MediaType 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("front", frontImg);
        body.add("back", backImg);
        body.add("member", member.getMemberId());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        String url = "http://localhost:8000/api/v2/member/top/";
        // 2. RestTemplate 객체를 생성합니다.
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        String memberTopUrl = response.getBody();
        memberTopUrl = memberTopUrl.substring(1, memberTopUrl.length() - 1); // " " 자르기



        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.status(200).body(MemberTopRes.of(memberTopUrl));
        } else
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
    }
}
