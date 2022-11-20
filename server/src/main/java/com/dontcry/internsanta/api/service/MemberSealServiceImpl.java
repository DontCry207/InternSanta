package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.api.response.MemberTicketRes;
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

import java.util.ArrayList;
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
    public void updateSeal(MemberSeal memberSeal, List<Seal> seals) {
        List<Integer> memberSeals = memberSeal.getMemberSeals();
        for(Seal seal: seals) {
            int idx = (int) (seal.getSealId() - 1);
            memberSeals.set(idx,memberSeals.get(idx)+1);
        }
        memberSealRepository.save(memberSeal);
    }

    @Override
    public List<Seal> getSeals(int count) {
        List<Seal> sealInfo = sealRepository.findAll();
        List<Seal> seals = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            int sealId = (int) (Math.random() * 12 + 1);
            Seal seal = Seal.builder()
                    .sealId(sealInfo.get(sealId - 1).getSealId())
                    .sealName(sealInfo.get(sealId - 1).getSealName())
                    .sealUrl(sealInfo.get(sealId - 1).getSealUrl())
                    .build();
            seals.add(seal);
        }
        return seals;
    }


    @Override
    public List<Seal> getAllSealList() {
        return sealRepository.findAll();
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
