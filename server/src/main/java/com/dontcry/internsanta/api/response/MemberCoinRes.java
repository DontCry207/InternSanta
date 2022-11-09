package com.dontcry.internsanta.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberCoinRes {
    int memberCoin;

    public static MemberCoinRes of(int memberCoin) {
        return MemberCoinRes.builder()
                .memberCoin(memberCoin)
                .build();
    }
}
