package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.common.exception.adventcalendar.AdventCalendarNotFoundException;
import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.db.entity.AdventCalendar;
import com.dontcry.internsanta.db.entity.Member;
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
        return null;
    }

    @Override
    public List<Integer> adventChulCheck(Member member) {
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        int todayDate = LocalDateTime.now().getDayOfMonth();
        List<AdventCalendar> adventCalendarList = adventCalendarRepository.findAllByMember(member).orElseThrow(()-> new AdventCalendarNotFoundException("advent calendar not found", ErrorCode.ADVENT_CALENDAR_NOT_FOUND));

        return null;
    }
}
