package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.MemberSeal;
import com.dontcry.internsanta.db.entity.Seal;
import com.dontcry.internsanta.db.repository.MemberSealRepository;
import com.dontcry.internsanta.db.repository.SealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SealServiceImpl implements SealService {

    @Autowired
    SealRepository sealRepository;
    @Autowired
    MemberSealRepository memberSealRepository;

    @Override
    public void updateSeal(MemberSeal memberSeal, Seal seal) {
        List<Integer> seals = memberSeal.getMemberSeals();
        long idx = seal.getSealId();
        seals.set((int) idx,seals.get((int) idx)+1);
        memberSealRepository.save(memberSeal);
    }

    @Override
    public Seal getSeal() {
        Seal seal = sealRepository.findRandomSeal();
        return seal;
    }
}
