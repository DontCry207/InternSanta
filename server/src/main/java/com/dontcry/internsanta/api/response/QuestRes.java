package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Quest;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestRes {
    Long questId;
    String questTitle;
    String questSub;
    int questNpc;

    public static QuestRes of(Quest quest) {
        return QuestRes.builder()
                .questId(quest.getQuestId())
                .questTitle(quest.getQuestTitle())
                .questSub(quest.getQuestSub())
                .questNpc(quest.getQuestNpc())
                .build();
    }

}
