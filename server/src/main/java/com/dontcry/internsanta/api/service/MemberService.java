package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.api.request.MemberRegistReq;
import com.dontcry.internsanta.db.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MemberService {
    Member getMemberByMemberEmail(String memberEmail);
    int updateMemberCoin(Member member, int memberCoin);
    int updateMemberPet(Member member, int memberPet);
    List<Integer> adventChulCheck(Member member);
    Member updateMemberChpater(Member member);
    Member updateMemberCheckpoint(Member member);

    Member registerMember(MemberRegistReq memberInfo);

    void registerRefreshToken(Member member, String token);

    Member getMemberByEmailAndPwd(String memberEmail, String memberPwd);
    String updateMemberTop(List<MultipartFile> memberTopList, Long memberId) throws IOException;
}
