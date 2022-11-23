package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.request.MinigameRegistReq;
import com.dontcry.internsanta.api.response.MinigameRankRes;
import com.dontcry.internsanta.api.service.MinigameService;
import com.dontcry.internsanta.common.JwtAuthenticationUtil;
import com.dontcry.internsanta.common.model.response.BaseResponseBody;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.MinigameRankInterface;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "미니게임 API", tags = {"Minigame"})
@RestController
@RequestMapping("/game")
public class MinigameController {

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

    @Autowired
    MinigameService minigameService;

    @GetMapping
    public ResponseEntity<?> getGameRanking(@RequestParam int mtype, @RequestParam int rtype, @RequestParam int cnt) {
        List<MinigameRankInterface> minigameRanking = minigameService.getMinigameRanking(mtype, rtype, cnt);
        return ResponseEntity.status(200).body(MinigameRankRes.of(minigameRanking));
    }

    @PostMapping
    public ResponseEntity<?> registerGame(@ApiIgnore Authentication authentication, @RequestBody MinigameRegistReq minigameRegistReq) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        minigameService.registerMinigameRanking(member, minigameRegistReq.getMinigameType(), minigameRegistReq.getScore());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
