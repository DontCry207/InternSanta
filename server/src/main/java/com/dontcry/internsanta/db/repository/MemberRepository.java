package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberEmail(String memberEmail);

    @Query(value = "select * from member order by member_ticket desc limit :count", nativeQuery = true)
    List<Member> findByMemberOrderByTicket(int count);

}
