package com.dontcry.internsanta.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class QuestScriptListRes {
    List<String> questScriptList;

    public static QuestScriptListRes of(List<String> questScriptList) {
        return QuestScriptListRes.builder()
                .questScriptList(questScriptList)
                .build();
    }

}
