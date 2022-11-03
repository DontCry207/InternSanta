package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.seal.SealNotStretchException;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.MemberSeal;
import com.dontcry.internsanta.db.entity.Seal;
import com.dontcry.internsanta.db.repository.MemberRepository;
import com.dontcry.internsanta.db.repository.MemberSealRepository;
import com.dontcry.internsanta.db.repository.SealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberSealServiceImpl implements MemberSealService {

    @Autowired
    SealRepository sealRepository;
    @Autowired
    MemberSealRepository memberSealRepository;

    @Autowired
    MemberRepository memberRepository;

    @Override
    public void updateSeal(MemberSeal memberSeal, Seal seal) {
        List<Integer> seals = memberSeal.getMemberSeals();
        int idx = (int) (seal.getSealId() - 1);
        seals.set(idx,seals.get(idx)+1);
        memberSealRepository.save(memberSeal);
    }

    @Override
    public Seal getSeal() {
        Seal seal = sealRepository.findRandomSeal();
        return seal;
    }

    @Override
    public List<Seal> getAllSealList() {
        List<Seal> sealList = sealRepository.findAll();
        return sealList;
    }

    @Override
    public void updateMemberTicket(Member member) {
        List<Integer> memberSealCnt = member.getMemberSeal().getMemberSeals();

        for (int i = 0; i < 12; i++) {
            if (memberSealCnt.get(i) == 0)
                throw new SealNotStretchException("씰이 부족합니다", ErrorCode.SEAL_NOT_STRETCH);
        }

        for (int i = 0; i < 12; i++) {
            memberSealCnt.set(i,memberSealCnt.get(i) - 1);
        }

        member.updateMemberTicket();
        memberRepository.save(member);
    }
}
