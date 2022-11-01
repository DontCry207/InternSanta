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

    // 어드벤트캘린더
    ADVENT_CALENDAR_NOT_FOUND(404, "ADVENT_CALENDAR_ERR_404", "ADVENT CALENDAR NOT FOUND"),

    // IO_EXCEPTION
    IO_EXCEPTION(409, "IO_ERR_409", "IO EXCEPTION"),

    // 파일 업로드
    FILE_UPLOAD_EXTENSION(409, "FILE_UPLOAD_ERR_409", "NOT ALLOWED FILE EXTENSION"),

    // 운세
    FORTUNE_NOT_FOUND(404, "FORTUNE_ERR_404", "FORTUNE NOT FOUND")

    ;


    private int status;
    private String errorCode;
    private String message;
}
