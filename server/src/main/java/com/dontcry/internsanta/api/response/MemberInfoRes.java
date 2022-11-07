package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberInfoRes {

    int memberCoin;
    int memberTicket;
    String memberTop;
    String memberBottom;
    int memberPet;
    int memberChapter;
    int memberCheckpoint;

    public static MemberInfoRes of(Member member) {
        MemberInfoRes res = MemberInfoRes.builder()
                .memberCoin(member.getMemberCoin())
                .memberTicket(member.getMemberTicket())
                .memberTop(member.getMemberTop())
                .memberBottom(member.getMemberBottom())
                .memberPet(member.getMemberPet())
                .memberChapter(member.getMemberChapter())
                .memberCheckpoint(member.getMemberCheckpoint()).build();

        return res;
    }

}
