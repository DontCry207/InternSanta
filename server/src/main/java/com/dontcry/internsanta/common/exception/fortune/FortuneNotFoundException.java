package com.dontcry.internsanta.common.exception.fortune;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class FortuneNotFoundException  extends RuntimeException{
    private ErrorCode errorCode;

    public FortuneNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
