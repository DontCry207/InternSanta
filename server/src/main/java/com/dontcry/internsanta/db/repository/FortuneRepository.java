package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.Fortune;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FortuneRepository extends JpaRepository<Fortune, Long> {
    Optional<Fortune> findByFortuneId(Long fortuneId);
    @Query("SELECT COUNT(f) FROM Fortune f")
    int countFortunes();
}
