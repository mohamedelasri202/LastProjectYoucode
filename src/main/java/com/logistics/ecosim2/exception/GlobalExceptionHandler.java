package com.logistics.ecosim2.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.lang.invoke.MethodHandle;

public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ErrorResponseDTO>handleValidationExceptions(MethodArgumentNotValidException ex,
                                                                  HttpServletRequest  request){

        String  message =ex.getBindingResult().get
    }
}
