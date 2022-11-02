package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.Seal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SealRepository extends JpaRepository<Seal, Long> {

    @Query(value = "SELECT * FROM Seal order by RAND() limit 1",nativeQuery = true)
    public Seal findRandomSeal();
}
