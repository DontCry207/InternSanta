package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.MinigameRankInterface;

import java.util.List;

public interface MinigameService {
    List<MinigameRankInterface> getMinigameRanking(int minigameType, int rankingType, int count);

    void registerMinigameRanking(Member member, int minigameType, int score);
}
