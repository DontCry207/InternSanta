package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Seal;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberSealRes {

    SealRes sealRes;
    int count;

    public static MemberSealRes of(Seal seal, int count) {
        MemberSealRes res = MemberSealRes.builder()
                .sealRes(SealRes.of(seal))
                .count(count)
                .build();

        return res;
    }
}
