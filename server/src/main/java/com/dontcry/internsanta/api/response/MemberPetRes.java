package com.dontcry.internsanta.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberPetRes {
    int memberPet;

    public static MemberPetRes of(int memberPet) {
        return MemberPetRes.builder()
                .memberPet(memberPet)
                .build();
    }

}
