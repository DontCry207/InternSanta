package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberInfoRes {
    String memberNickname;
    int memberCoin;
    int memberTicket;
    String memberTop;
    int memberPet;
    int memberChapter;
    int memberCheckpoint;

    public static MemberInfoRes of(Member member) {
        return MemberInfoRes.builder()
                .memberNickname(member.getMemberNickname())
                .memberCoin(member.getMemberCoin())
                .memberTicket(member.getMemberTicket())
                .memberTop(member.getMemberTop())
                .memberPet(member.getMemberPet())
                .memberChapter(member.getMemberChapter())
                .memberCheckpoint(member.getMemberCheckpoint()).build();
    }

}
