package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.member.*;
import com.dontcry.internsanta.common.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("handleException", e);
        ErrorResponse response = new ErrorResponse(ErrorCode.INTER_SERVER_ERROR);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 멤버
    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMemberNotFoundException(MemberNotFoundException e) {
        log.error("handleMemberNotFoundException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(MemberEmailDuplicationException.class)
    public ResponseEntity<ErrorResponse> handleMemberEmailDuplicationException(MemberEmailDuplicationException e) {
        log.error("handleMemberEmailDuplicationException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 토큰 없는 경우 (401 Unauthorized)
    @ExceptionHandler(MemberUnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleMemberUnauthorizedException(MemberUnauthorizedException e) {
        log.error("handleMemberUnauthorizedException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(MemberNicknameValidateException.class)
    public ResponseEntity<ErrorResponse> handleMemberNicknameValidateException(MemberNicknameValidateException e) {
        log.error("handleMemberNicknameValidateException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 코인 변경 시 음수가 되는 경우
    @ExceptionHandler(MemberCoinNegativeException.class)
    public ResponseEntity<ErrorResponse> handleMemberCoinNegativeException(MemberCoinNegativeException e) {
        log.error("handleMemberCoinNegativeException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

}
