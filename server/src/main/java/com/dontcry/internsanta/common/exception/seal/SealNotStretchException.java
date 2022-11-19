package com.dontcry.internsanta.common.exception.seal;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class SealNotStretchException extends RuntimeException{

    private ErrorCode errorCode;

    public SealNotStretchException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }

}
