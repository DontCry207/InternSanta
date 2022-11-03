package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.response.QuestRes;
import com.dontcry.internsanta.api.response.QuestScriptListRes;
import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.api.service.QuestService;
import com.dontcry.internsanta.common.JwtAuthenticationUtil;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.Quest;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "퀘스트 API", tags = {"Quest"})
@RestController
@RequestMapping("/quest")
public class QuestController {

    @Autowired
    QuestService questService;
    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;
    @Autowired
    MemberService memberService;

    @GetMapping
    public ResponseEntity<QuestRes> getQuest(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Quest quest = questService.getQuest(member);
        return ResponseEntity.status(200).body(QuestRes.of(quest));
    }

    @GetMapping("/script")
    public ResponseEntity<QuestScriptListRes> getQuestScript(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        List<String> questScriptList = questService.getQuestScript(member);
        return ResponseEntity.status(200).body(QuestScriptListRes.of(questScriptList));
    }
}
