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
    MEMBER_IMAGE_NOT_FOUND(404, "MEMBER_ERR_409", "이미지를 찾을 수 없습니다."),

    // 태그
    TAG_NOT_FOUND(404,"TAG_ERR_404","태그가 존재하지 않습니다."),
    TAG_DUPLICATION(409,"TAG_ERR_409","중복된 태그입니다."),

    // IO_EXCEPTION
    IO_EXCEPTION(409, "IO_ERR_409", "IO EXCEPTION"),

    // 노래
    SONG_NOT_FOUND(404, "SONG_ERR_404", "SONG NOT FOUND"),

    // 쇼츠
    SHORTS_NOT_FOUND(404, "SHORTS_ERR_404", "SHORTS NOT FOUND"),
    SHORTS_LIKE_NOT_FOUND(404, "SHORTS_LIKE_ERR_404", "SHORTS LIKE NOT FOUND"),
    SHORTS_LIKE_DUPLICATION(409, "SHORTS_LIKE_ERR_409", "SHORTS LIKE DUPLICATION"),

    // 매거진
    MAGAZINE_NOT_FOUND(404, "MAGAZINE_ERR_404", "MAGAZINE NOT FOUND"),

    // 파일 업로드
    FILE_UPLOAD_EXTENSION(409, "FILE_UPLOAD_ERR_409", "NOT ALLOWED FILE EXTENSION")
    ;


    private int status;
    private String errorCode;
    private String message;
}
