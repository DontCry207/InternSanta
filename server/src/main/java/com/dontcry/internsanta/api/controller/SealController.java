package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.service.SealService;
import com.dontcry.internsanta.common.JwtAuthenticationUtil;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.Seal;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping
    public ResponseEntity<?> updateSeal(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        // 1. 코인 감소

        // 2. 랜덤으로 씰 뽑기
        Seal seal = sealService.getSeal();
        // 3. member 테이블에 씰 업데이트해주기
        sealService.updateSeal(member.getMemberId());

        // 4. 결과값 리턴해주기
        return null;
    }


}
