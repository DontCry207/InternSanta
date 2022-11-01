package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.Seal;
import com.dontcry.internsanta.db.repository.SealRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class SealServiceImpl implements SealService {

    @Autowired
    SealRepository sealRepository;

    @Override
    public void updateSeal(Long memberId) {

    }

    @Override
    public Seal getSeal() {

        Seal seal = sealRepository.findByRand();

        return seal;
    }
}
