package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class MemberLoginRes {
    String memberNickname;
    int memberCoin;
    int memberTicket;
    String memberTop;
    int memberPet;
    int memberChapter;
    int memberCheckpoint;
    String refreshToken;
    String accessToken;

    public static MemberLoginRes of(Member member, Map<String, String> tokens) {
        return MemberLoginRes.builder()
                .memberNickname(member.getMemberNickname())
                .memberCoin(member.getMemberCoin())
                .memberTicket(member.getMemberTicket())
                .memberTop(member.getMemberTop())
                .memberPet(member.getMemberPet())
                .memberChapter(member.getMemberChapter())
                .memberCheckpoint(member.getMemberCheckpoint())
                .refreshToken(tokens.get("refreshToken"))
                .accessToken(tokens.get("accessToken")).build();
    }
}
