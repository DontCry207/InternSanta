package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.request.MemberCoinUpdateReq;
import com.dontcry.internsanta.api.request.MemberPetUpdateReq;
import com.dontcry.internsanta.api.response.MemberCoinRes;
import com.dontcry.internsanta.api.response.MemberPetRes;
import com.dontcry.internsanta.api.response.MemberProgressRes;
import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.common.JwtAuthenticationUtil;
import com.dontcry.internsanta.db.entity.Member;
import io.swagger.annotations.Api;
import com.dontcry.internsanta.api.response.MemberAdventCalendarListRes;
import com.dontcry.internsanta.common.auth.MemberDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PatchMapping("/chapter")
    public ResponseEntity<?> updateMemberChapter(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Member updateMember = memberService.updateMemberChpater(member);
        return ResponseEntity.status(200).body(MemberProgressRes.of(updateMember));
    }

    @PatchMapping("/checkpoint")
    public ResponseEntity<?> updateMemberCheckpoint(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Member updateMember = memberService.updateMemberCheckpoint(member);
        return ResponseEntity.status(200).body(MemberProgressRes.of(updateMember));
    }
}
