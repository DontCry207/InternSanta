package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class MemberLoginRes {
    int memberCoin;
    int memberTicket;
    String memberTop;
    String memberBottom;
    int memberPet;
    int memberChapter;
    int memberCheckpoint;
    String refreshToken;
    String accessToken;

    public static MemberLoginRes of(Member member, Map<String, String> tokens) {
        MemberLoginRes res = MemberLoginRes.builder()
                .memberCoin(member.getMemberCoin())
                .memberTicket(member.getMemberTicket())
                .memberTop(member.getMemberTop())
                .memberBottom(member.getMemberBottom())
                .memberPet(member.getMemberPet())
                .memberChapter(member.getMemberChapter())
                .memberCheckpoint(member.getMemberCheckpoint())
                .refreshToken(tokens.get("refreshToken"))
                .accessToken(tokens.get("accessToken")).build();

        return res;
    }

}
