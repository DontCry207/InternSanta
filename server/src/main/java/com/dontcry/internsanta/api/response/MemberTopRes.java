package com.dontcry.internsanta.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberTopRes {
    String memberTop;

    public static MemberTopRes of(String memberTop) {
        return MemberTopRes.builder()
                .memberTop(memberTop).build();
    }

}
