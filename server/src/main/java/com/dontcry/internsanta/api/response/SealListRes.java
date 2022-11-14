package com.dontcry.internsanta.api.response;

import com.dontcry.internsanta.db.entity.Seal;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class SealListRes {
    List<SealRes> sealResList;

    public static SealListRes of(List<Seal> sealList) {
        List<SealRes> sealResList = new ArrayList<>();
        for(Seal seal: sealList) {
            sealResList.add(SealRes.builder()
                    .sealName(seal.getSealName())
                    .sealUrl(seal.getSealUrl())
                    .build());
        }

        return SealListRes.builder()
                .sealResList(sealResList)
                .build();
    }
}
