package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.quest.QuestNotFoundException;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.Quest;
import com.dontcry.internsanta.db.entity.QuestScript;
import com.dontcry.internsanta.db.repository.QuestRepository;
import com.dontcry.internsanta.db.repository.QuestScriptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class QuestServiceImpl implements QuestService{

    @Autowired
    QuestRepository questRepository;
    @Autowired
    QuestScriptRepository questScriptRepository;
    @Override
    public Quest getQuest(Member member) {
        Quest quest = questRepository.findByQuestChapterAndQuestCheckpoint(member.getMemberChapter(), member.getMemberCheckpoint())
                .orElseThrow(() -> new QuestNotFoundException("quest not found", ErrorCode.QUEST_NOT_FOUND));
        return quest;
    }

    @Override
    public List<String> getQuestScript(Member member) {
        String questScriptTxt = questScriptRepository.findByQuestChapterAndQuestScript(member.getMemberChapter(), member.getMemberCheckpoint())
                .orElseThrow(() -> new QuestNotFoundException("quest not found", ErrorCode.QUEST_NOT_FOUND));
        List<String> questScriptList = Arrays.asList(questScriptTxt.split(","));
        return questScriptList;
    }
}
