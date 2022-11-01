package com.dontcry.internsanta.common.exception.adventcalendar;

import com.dontcry.internsanta.common.exception.code.ErrorCode;

public class AdventCalendarNotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public AdventCalendarNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
