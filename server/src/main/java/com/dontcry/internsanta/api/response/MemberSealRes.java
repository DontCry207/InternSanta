package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Seal;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberSealRes {

    private String sealName;
    private String sealUrl;
    private int count;

    public static MemberSealRes of(Seal seal, int count) {
        return MemberSealRes.builder()
                .sealName(seal.getSealName())
                .sealUrl(seal.getSealUrl())
                .count(count)
                .build();
    }
}
