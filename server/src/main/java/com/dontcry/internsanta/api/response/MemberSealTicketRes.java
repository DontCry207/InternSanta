package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MemberSealTicketRes {

    private List<MemberSealRes> memberSealResList;
    private int memberTicket;

    public static MemberSealTicketRes of(Member member, List<MemberSealRes> memberSealResList) {
        return MemberSealTicketRes.builder()
                .memberSealResList(memberSealResList)
                .memberTicket(member.getMemberTicket()).build();
    }
}
