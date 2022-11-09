package com.dontcry.internsanta.api.response;


import com.dontcry.internsanta.db.entity.Seal;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SealRes {
    private String sealName;
    private String sealUrl;

    public static SealRes of (Seal seal) {
        return SealRes
                .builder()
                .sealName(seal.getSealName())
                .sealUrl(seal.getSealUrl())
                .build();
    }
}
