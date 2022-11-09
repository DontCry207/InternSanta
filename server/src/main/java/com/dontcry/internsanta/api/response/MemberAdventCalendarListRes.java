package com.dontcry.internsanta.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class MemberAdventCalendarListRes {
    List<Integer> memberAdventCalendarList;

    public static MemberAdventCalendarListRes of(List<Integer> adventCalendarList){
        List<Integer> list = new ArrayList<>();
        for(Integer date : adventCalendarList){
            list.add(date);
        }
        return MemberAdventCalendarListRes.builder()
                .memberAdventCalendarList(list)
                .build();
    }
}
