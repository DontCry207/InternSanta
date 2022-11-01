package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.member.MemberCoinNegativeException;
import com.dontcry.internsanta.common.exception.member.MemberNotFoundException;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.common.exception.adventcalendar.AdventCalendarNotFoundException;
import com.dontcry.internsanta.db.entity.AdventCalendar;
import com.dontcry.internsanta.db.repository.AdventCalendarRepository;
import com.dontcry.internsanta.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    AdventCalendarRepository adventCalendarRepository;

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
}
