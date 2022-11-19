package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberProgressRes {
    int memberChapter;
    int memberCheckpoint;

    public static MemberProgressRes of(Member member) {
        return MemberProgressRes.builder()
                .memberChapter(member.getMemberChapter())
                .memberCheckpoint(member.getMemberCheckpoint())
                .build();
    }

}
