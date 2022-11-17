package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.api.request.MemberCoinUpdateReq;
import com.dontcry.internsanta.api.request.MemberLoginReq;
import com.dontcry.internsanta.api.request.MemberPetUpdateReq;
import com.dontcry.internsanta.api.request.MemberRegistReq;
import com.dontcry.internsanta.api.response.*;
import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.common.JwtAuthenticationUtil;
import com.dontcry.internsanta.common.JwtTokenUtil;
import com.dontcry.internsanta.common.auth.MemberDetails;
import com.dontcry.internsanta.common.model.response.BaseResponseBody;
import com.dontcry.internsanta.db.entity.Member;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(value = "멤버 API", tags = {"Member"})
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

    @PatchMapping("/coin")
    public ResponseEntity<MemberCoinRes> updateMemberCoin(@RequestBody MemberCoinUpdateReq memberCoinUpdateReq, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        int memberCoin = memberService.updateMemberCoin(member, memberCoinUpdateReq.getMemberCoin());
        return ResponseEntity.status(200).body(MemberCoinRes.of(memberCoin));
    }

    @PatchMapping("/pet")
    public ResponseEntity<MemberPetRes> updateMemberPet(@RequestBody MemberPetUpdateReq memberPetUpdateReq, @ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        int memberPet = memberService.updateMemberPet(member, memberPetUpdateReq.getMemberPet());
        return ResponseEntity.status(200).body(MemberPetRes.of(memberPet));
    }

    @PatchMapping("/advent")
    public ResponseEntity<MemberAdventCalendarListRes> adventChulCheck(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Member member = memberDetails.getUser();
        List<Integer> memberAdventCalendarList = new ArrayList<>();
        memberService.adventChulCheck(member);


        return ResponseEntity.status(200).body(MemberAdventCalendarListRes.of(memberAdventCalendarList));
    }

    @PostMapping
    public ResponseEntity<BaseResponseBody> registerMember(@RequestBody MemberRegistReq memberRegistReq) {

        Member member = memberService.registerMember(memberRegistReq);

        Map<String, String> tokens = JwtTokenUtil.generateTokenSet(member.getMemberEmail());
        memberService.registerRefreshToken(member, tokens.get("refreshToken"));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping
    public ResponseEntity<MemberInfoRes> getMemberInfo(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);

        return ResponseEntity.status(200).body(MemberInfoRes.of(member)) ;
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginRes> getMemberByLogin(@RequestBody MemberLoginReq memberLoginReq) {

        Member member = memberService.getMemberByEmailAndPwd(memberLoginReq.getMemberEmail(), memberLoginReq.getMemberPwd());

        Map<String, String> tokens = JwtTokenUtil.generateTokenSet(member.getMemberEmail());
        memberService.registerRefreshToken(member, tokens.get("refreshToken"));

        return ResponseEntity.status(200).body(MemberLoginRes.of(member,tokens)) ;
    }

    @PatchMapping("/chapter")
    public ResponseEntity<MemberProgressRes> updateMemberChapter(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Member updateMember = memberService.updateMemberChpater(member);
        return ResponseEntity.status(200).body(MemberProgressRes.of(updateMember));
    }

    @PatchMapping("/checkpoint")
    public ResponseEntity<MemberProgressRes> updateMemberCheckpoint(@ApiIgnore Authentication authentication) {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        Member updateMember = memberService.updateMemberCheckpoint(member);
        return ResponseEntity.status(200).body(MemberProgressRes.of(updateMember));
    }

    @PostMapping("/top")
    public ResponseEntity<MemberTopRes> updateMemberTop(@RequestParam(value = "clothesFront") String clothesFront, @RequestParam(value = "clothesBack") String clothesBack, @ApiIgnore Authentication authentication) throws IOException {
        Member member = jwtAuthenticationUtil.jwtTokenAuth(authentication);
        String memberTopUrl = memberService.updateMemberTop(clothesFront, clothesBack, member);
            return ResponseEntity.status(200).body(MemberTopRes.of(memberTopUrl));
    }

    @GetMapping("/refresh")
    public ResponseEntity<MemberTokenRes> tokenRefresh(@RequestHeader(value = "REFRESH-TOKEN") String refreshToken) {

        Map<String, String> tokens = memberService.modifyRefreshToken(refreshToken);

        return ResponseEntity.status(200).body(MemberTokenRes.of(tokens));
    }


    @GetMapping("/rank/{count}")
    public ResponseEntity<List<MemberTicketRes>> getMemberTicketRank(@PathVariable("count") int count) {
        return ResponseEntity.status(200).body(memberService.getMemberTicketRank(count));
    }

}
