package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.response.MemberAdventCalendarListRes;
import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.common.auth.MemberDetails;
import com.dontcry.internsanta.db.entity.Member;
import io.swagger.annotations.Api;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(value = "멤버 API", tags = {"Member"})
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @PatchMapping("/advent")
    public ResponseEntity<MemberAdventCalendarListRes> adventChulCheck(@ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        List<Integer> memberAdventCalendarList = new ArrayList<>();
        memberService.adventChulCheck(member);


        return ResponseEntity.status(200).body(MemberAdventCalendarListRes.of(memberAdventCalendarList));
    }
}
