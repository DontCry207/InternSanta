package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.MinigameRankInterface;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class MinigameRankRes {
    String memberNickname;
    int minigameScore;

    public static List<MinigameRankRes> of(List<MinigameRankInterface> minigames) {
        List<MinigameRankRes> minigameRankRes = new ArrayList<>();
        for (MinigameRankInterface minigame: minigames) {
            minigameRankRes.add(MinigameRankRes.builder()
                    .memberNickname(minigame.getMemberNickname())
                    .minigameScore(minigame.getMinigameScore())
                    .build());
        }
        return minigameRankRes;
    }
}
