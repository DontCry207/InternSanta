package com.dontcry.internsanta.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberTopRes {
    String memberTop;

    public static MemberTopRes of(String memberTop) {
        MemberTopRes res = MemberTopRes.builder()
                .memberTop(memberTop).build();

        return res;
    }

}
