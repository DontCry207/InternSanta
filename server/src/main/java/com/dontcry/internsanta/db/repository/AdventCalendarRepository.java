package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.AdventCalendar;
import com.dontcry.internsanta.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdventCalendarRepository extends JpaRepository<AdventCalendar, Long> {
    Optional<List<AdventCalendar>> findAllByMember(Member member);
}
