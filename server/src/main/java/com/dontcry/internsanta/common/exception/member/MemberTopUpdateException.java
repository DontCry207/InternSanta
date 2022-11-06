package com.dontcry.internsanta.common.exception.member;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class MemberTopUpdateException extends RuntimeException{
    private ErrorCode errorCode;

    public MemberTopUpdateException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
