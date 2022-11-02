package com.dontcry.internsanta.common.exception.quest;

import com.dontcry.internsanta.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class QuestNotFoundException  extends RuntimeException{
    private ErrorCode errorCode;

    public QuestNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}