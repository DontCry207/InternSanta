package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.Seal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SealRepository extends JpaRepository<Seal, Long> {
    List<Seal> findAll();
}
