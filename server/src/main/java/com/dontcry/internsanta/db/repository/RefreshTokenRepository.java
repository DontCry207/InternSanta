package com.dontcry.internsanta.db.repository;

import com.dontcry.internsanta.db.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByMemberMemberId(Long memberId);

    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
