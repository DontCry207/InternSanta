package com.dontcry.internsanta.common.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NOT_FOUND(404, "COMMON_ERR_404", "PAGE NOT FOUND"),
    INTER_SERVER_ERROR(500, "COMMON_ERR_500", "INTER SERVER ERROR"),

    // 멤버
    MEMBER_NOT_FOUND(404, "MEMBER_ERR_404", "MEMBER NOT FOUND"),
    NICKNAME_LENGTH_ERROR(409,"NICKNAME_LENGTH_409","닉네임을 6자 이내로 설정해주세요"),
    NICKNAME_DUPLICATION(409, "MEMBER_ERR_409", "이미 존재하는 닉네임입니다."),
    EMAIL_DUPLICATION(409, "MEMBER_ERR_409", "이미 존재하는 이메일입니다."),
    MEMBER_UNAUTHORIZED(401, "MEMBER_ERR_401", "MEMBER UNAUTHORIZED"),
    MEMBER_COIN_ERROR(409, "MEMBER_COIN_ERR_409", "보유 중인 코인보다 사용하는 코인이 많습니다."),

    MEMBER_TOP_UPDATE_ERROR(409, "MEMBER_TOP_ERR_409", "상의 업데이트 중 에러가 발생했습니다."),
    MEMBER_TOP_IMAGE_ERROR(409, "MEMBER_TOP_IMAGE_ERR_409", "이미지 파일의 개수가 2개가 아닙니다."),
    MEMBER_COUNT_ERROR(409, "MEMBER_COUNT_ERR_409", "count 값이 유효하지 않습니다."),
    // 어드벤트캘린더
    ADVENT_CALENDAR_NOT_FOUND(404, "ADVENT_CALENDAR_ERR_404", "ADVENT CALENDAR NOT FOUND"),

    // 퀘스트
    QUEST_NOT_FOUND(404, "QUEST_ERR_404", "QUEST NOT FOUND"),

    // 파일 업로드
    FILE_UPLOAD_EXTENSION(409, "FILE_UPLOAD_ERR_409", "NOT ALLOWED FILE EXTENSION"),

    // 운세
    FORTUNE_NOT_FOUND(404, "FORTUNE_ERR_404", "FORTUNE NOT FOUND"),

    // 씰
    SEAL_NOT_STRETCH(409,"SEAL_ERR_409","SEAL NOT STRETCH")
    ;


    private int status;
    private String errorCode;
    private String message;
}
