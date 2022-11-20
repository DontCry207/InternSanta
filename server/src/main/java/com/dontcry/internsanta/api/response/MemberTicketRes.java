package com.dontcry.internsanta.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberTicketRes {
    String memberNickname;
    int memberTicket;


}
