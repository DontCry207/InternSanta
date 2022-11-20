package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.Fortune;

public interface FortuneService {
    Fortune getRandomFortune(Long memberId);
}
