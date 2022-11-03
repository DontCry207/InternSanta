package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.response.MemberSealRes;
import com.dontcry.internsanta.api.response.MemberSealTicketRes;
import com.dontcry.internsanta.api.response.SealRes;
import com.dontcry.internsanta.api.service.MemberSealService;
import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.common.JwtAuthenticationUtil;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.Seal;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(value = "씰 API", tags = {"Seal"})
@RestController
@RequestMapping("/seal")
public class MemberSealController {

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

    @Autowired
    MemberSealService memberSealService;

    @Autowired
    MemberService memberService;

    @PatchMapping
    public ResponseEntity<SealRes> updateMemberSeal(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        memberService.updateMemberCoin(member, -10);

        Seal seal = memberSealService.getSeal();

        memberSealService.updateSeal(member.getMemberSeal(), seal);

        return ResponseEntity.status(200).body(SealRes.of(seal));
    }

    @GetMapping
    public ResponseEntity<List<MemberSealRes>> getMemberSeals(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        List<Seal> sealList = memberSealService.getAllSealList();
        List<Integer> memberSealCnt = member.getMemberSeal().getMemberSeals();

        List<MemberSealRes> memberSealResList = new ArrayList<>();

        for (int i = 0; i < 12; i++) {
            memberSealResList.add(MemberSealRes.of(sealList.get(i), memberSealCnt.get(i)));
        }

        return ResponseEntity.status(200).body(memberSealResList);
    }

    @PatchMapping("/ticket")
        public ResponseEntity<MemberSealTicketRes> updateMemberTicket(@ApiIgnore Authentication authentication) {
            Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        memberSealService.updateMemberTicket(member);

        List<Seal> sealList = memberSealService.getAllSealList();
        List<Integer> memberSealCnt = member.getMemberSeal().getMemberSeals();
        List<MemberSealRes> memberSealResList = new ArrayList<>();

        for (int i = 0; i < 12; i++) {
            memberSealResList.add(MemberSealRes.of(sealList.get(i), memberSealCnt.get(i)));
        }

        return ResponseEntity.status(200).body(MemberSealTicketRes.of(member,memberSealResList));
    }

}
