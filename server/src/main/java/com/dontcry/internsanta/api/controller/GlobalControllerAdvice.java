package com.dontcry.internsanta.api.controller;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import com.dontcry.internsanta.common.exception.member.MemberCoinNegativeException;
import com.dontcry.internsanta.common.exception.member.MemberNicknameValidateException;
import com.dontcry.internsanta.common.exception.member.MemberNotFoundException;
import com.dontcry.internsanta.common.exception.member.MemberUnauthorizedException;
import com.dontcry.internsanta.common.exception.quest.QuestNotFoundException;
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

    // 보유 중인 코인보다 사용하는 코인이 많은 경우
    @ExceptionHandler(MemberCoinNegativeException.class)
    public ResponseEntity<ErrorResponse> handleMemberCoinNegativeException(MemberCoinNegativeException e) {
        log.error("handleMemberCoinNegativeException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(QuestNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleQuestNotFoundException(QuestNotFoundException e) {
        log.error("handleQuestNotFoundException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

}
