package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.Member;

import java.util.List;

public interface MemberService {
    Member getMemberByMemberEmail(String memberEmail);
    List<Integer> adventChulCheck(Member member);
}
