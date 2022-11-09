package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.fortune.FortuneNotFoundException;
import com.dontcry.internsanta.db.entity.Fortune;
import com.dontcry.internsanta.db.repository.FortuneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FortuneServiceImpl implements FortuneService{

    @Autowired
    FortuneRepository fortuneRepository;

    @Override
    public Fortune getRandomFortune() {
        return fortuneRepository.findRandomFortune().orElseThrow(() -> new FortuneNotFoundException("fortune not found", ErrorCode.FORTUNE_NOT_FOUND));
    }
}
