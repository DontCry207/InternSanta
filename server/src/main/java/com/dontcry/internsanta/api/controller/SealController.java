package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.response.SealRes;
import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.api.service.SealService;
import com.dontcry.internsanta.common.JwtAuthenticationUtil;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.Seal;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "씰 API", tags = {"Seal"})
@RestController
@RequestMapping("/seal")
public class SealController {

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

    @Autowired
    SealService sealService;

    @Autowired
    MemberService memberService;

    @PatchMapping
    public ResponseEntity<SealRes> updateSeal(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        memberService.updateMemberCoin(member,-10);

        Seal seal = sealService.getSeal();

        sealService.updateSeal(member.getMemberSeal(),seal);

        return ResponseEntity.status(200).body(SealRes.of(seal));
    }
}
