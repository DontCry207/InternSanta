package com.dontcry.internsanta.common.exception.member;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class MemberNicknameValidateException extends RuntimeException{
    private ErrorCode errorCode;

    public MemberNicknameValidateException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}