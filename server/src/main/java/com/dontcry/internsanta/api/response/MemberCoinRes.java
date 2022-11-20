package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Fortune;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberCoinRes {
    int memberCoin;

    public static MemberCoinRes of(int memberCoin) {
        MemberCoinRes res = MemberCoinRes.builder()
                .memberCoin(memberCoin)
                .build();
        return res;
    }
}
