package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    Optional<Quest> findByQuestChapterAndQuestCheckpoint(int questChapter, int questCheckpoint);
}
