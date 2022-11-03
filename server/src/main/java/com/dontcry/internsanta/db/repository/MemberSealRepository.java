package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.MemberSeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberSealRepository extends JpaRepository<MemberSeal, Long> {

}
