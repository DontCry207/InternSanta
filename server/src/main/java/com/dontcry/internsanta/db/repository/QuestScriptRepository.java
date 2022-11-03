package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.QuestScript;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestScriptRepository extends JpaRepository<QuestScript, Long> {
    @Query(value = "select s.quest_script_txt as questScriptTxt from quest q\n" +
            "join quest_script s\n" +
            "on q.quest_id = s.quest_id\n" +
            "where quest_chapter = :questChapter and quest_checkpoint = :questCheckpoint", nativeQuery = true)
    Optional<String> findByQuestChapterAndQuestScript(int questChapter, int questCheckpoint);
}
