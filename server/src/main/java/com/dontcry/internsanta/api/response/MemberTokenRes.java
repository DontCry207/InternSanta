package com.dontcry.internsanta.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class MemberTokenRes {
    String accessToken;
    String refreshToken;

    public static MemberTokenRes of(Map<String, String> tokens) {
        return MemberTokenRes.builder()
                .accessToken(tokens.get("accessToken"))
                .refreshToken(tokens.get("refreshToken")).build();
    }
}
