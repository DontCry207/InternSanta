package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.Minigame;
import com.dontcry.internsanta.db.entity.MinigameRankInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MinigameRepository extends JpaRepository<Minigame, Long> {
    @Query(value = "select member_nickname as memberNickname, max(minigame_score) as minigameScore from minigame\n" +
            "where minigame_type = :minigameType\n" +
            "group by memberNickname\n" +
            "order by minigameScore desc limit :count", nativeQuery = true)
    List<MinigameRankInterface> findMinigameRankingByScore(int minigameType, int count);

    @Query(value = "select member_nickname memberNickname, count(member_nickname) minigameScore from minigame\n" +
            "where minigame_type = :minigameType\n" +
            "group by memberNickname\n" +
            "order by minigameScore desc limit :count", nativeQuery = true)
    List<MinigameRankInterface> findMinigameRankingByPlaytime(int minigameType, int count);
}
