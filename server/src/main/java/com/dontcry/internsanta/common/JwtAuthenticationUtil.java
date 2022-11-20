package com.dontcry.internsanta.common;

import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.common.auth.MemberDetails;
import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.member.MemberNotFoundException;
import com.dontcry.internsanta.common.exception.member.MemberUnauthorizedException;
import com.dontcry.internsanta.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationUtil {

    @Autowired
    MemberService memberService;

    public Member jwtTokenAuth(Authentication authentication) {
        if (authentication == null)
            throw new MemberUnauthorizedException("member unauthorized", ErrorCode.MEMBER_UNAUTHORIZED);
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        if (memberDetails == null)
            throw new MemberUnauthorizedException("member unauthorized", ErrorCode.MEMBER_UNAUTHORIZED);
        String email = memberDetails.getUsername();
        Member member = memberService.getMemberByMemberEmail(email);
        if (member == null)
            throw new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND);
        return member;
    }
}
