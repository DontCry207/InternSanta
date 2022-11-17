package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.fortune.FortuneNotFoundException;
import com.dontcry.internsanta.db.entity.Fortune;
import com.dontcry.internsanta.db.repository.FortuneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class FortuneServiceImpl implements FortuneService{

    @Autowired
    FortuneRepository fortuneRepository;

    @Override
    public Fortune getRandomFortune(Long memberId) {
        int fortuneCnt = fortuneRepository.countFortunes();
        Long seed = (LocalDateTime.now().getMonthValue() + LocalDateTime.now().getDayOfMonth() + memberId) % fortuneCnt;
        Random random = new Random(Math.abs(seed.intValue()));
        int fortuneId = random.nextInt(Math.abs(seed.intValue()));
        if(fortuneId == 0) fortuneId = 1;
        return fortuneRepository.findByFortuneId(new Long(fortuneId)).orElseThrow(() -> new FortuneNotFoundException("fortune not found", ErrorCode.FORTUNE_NOT_FOUND));
    }
}
