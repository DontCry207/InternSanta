package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.response.FortuneRes;
import com.dontcry.internsanta.api.service.FortuneService;
import com.dontcry.internsanta.common.auth.MemberDetails;
import com.dontcry.internsanta.db.entity.Fortune;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "운세 API", tags = {"Fortune"})
@RestController
@RequestMapping("/fortune")
public class FortuneController {

    @Autowired
    FortuneService fortuneService;

    @GetMapping
    public ResponseEntity<FortuneRes> getFortune(@ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Fortune fortune = fortuneService.getRandomFortune(memberDetails.getMemberId());
        return ResponseEntity.status(200).body(FortuneRes.of(fortune));
    }
}
