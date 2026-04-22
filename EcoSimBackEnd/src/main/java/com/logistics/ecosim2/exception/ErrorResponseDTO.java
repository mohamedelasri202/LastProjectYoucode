package com.logistics.ecosim2.exception;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Builder
public class ErrorResponseDTO {
   private LocalDateTime timeStamp;
    private int httpCode;
    private String errorType;
    private String message;
    private String path;
}
