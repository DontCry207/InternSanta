package com.dontcry.internsanta.common.exception.file;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class FileUploadExtensionException extends RuntimeException{
    private ErrorCode errorCode;

    public FileUploadExtensionException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
