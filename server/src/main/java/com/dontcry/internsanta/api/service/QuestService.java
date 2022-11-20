package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.Quest;

import java.util.List;

public interface QuestService {
    Quest getQuest(Member member);
    List<String> getQuestScript(Member member);
}
