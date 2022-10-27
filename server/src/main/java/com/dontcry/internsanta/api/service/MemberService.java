package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.Member;

public interface MemberService {
    public Member getMemberByMemberEmail(String memberEmail);
}
