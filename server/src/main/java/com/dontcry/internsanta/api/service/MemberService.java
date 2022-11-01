package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.api.request.MemberRegistReq;
import com.dontcry.internsanta.db.entity.Member;

import java.util.List;

public interface MemberService {
    Member getMemberByMemberEmail(String memberEmail);
    int updateMemberCoin(Member member, int memberCoin);
    int updateMemberPet(Member member, int memberPet);
    List<Integer> adventChulCheck(Member member);

    Member registerMember(MemberRegistReq memberInfo);

    void registerRefreshToken(Member member, String token);
}
