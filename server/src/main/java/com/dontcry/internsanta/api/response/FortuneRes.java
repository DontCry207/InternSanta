package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Fortune;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FortuneRes {
    String fortune;

    public static FortuneRes of(Fortune fortune) {
        FortuneRes res = FortuneRes.builder()
                .fortune(fortune.getFortuneContent())
                .build();
        return res;
    }
}
