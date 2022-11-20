package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.api.response.MemberTicketRes;
import com.dontcry.internsanta.db.entity.Member;
import com.dontcry.internsanta.db.entity.MemberSeal;
import com.dontcry.internsanta.db.entity.Seal;

import java.util.List;

public interface MemberSealService {

    void updateSeal(MemberSeal memberSeal, List<Seal> seals);

    List<Seal> getSeals(int count);
    List<Seal> getAllSealList();

    void updateMemberTicket(Member member);

}
