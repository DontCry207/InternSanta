package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.Minigame;
import com.dontcry.internsanta.db.entity.MinigameRankInterface;
import com.dontcry.internsanta.db.repository.MinigameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MinigameServiceImpl implements MinigameService{

    @Autowired
    MinigameRepository minigameRepository;

    @Override
    public List<MinigameRankInterface> getMinigameRanking(int minigameType, int rankingType, int count) {
        if (rankingType == 1)
            return minigameRepository.findMinigameRankingByScore(minigameType, count);
        else
            return minigameRepository.findMinigameRankingByPlaytime(minigameType, count);
    }

    @Override
    public void registerMinigameRanking(Member member, int minigameType, int score) {
        minigameRepository.save(Minigame.builder()
                .memberNickname(member.getMemberNickname())
                .minigameScore(score)
                .minigameType(minigameType)
                .build());
    }
}
