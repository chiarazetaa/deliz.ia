package com.delizia.exception;

import com.delizia.model.dto.ErrorDTO;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AppExceptionHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ResponseBody
  protected ErrorDTO handleEntityNotFoundException(EntityNotFoundException ex) {
    return new ErrorDTO(HttpStatus.NOT_FOUND.value(), Collections.singletonList(ex.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorDTO handleValidationException(MethodArgumentNotValidException ex) {
    List<String> errors =
        ex.getBindingResult().getAllErrors().stream()
            .map(ObjectError::getDefaultMessage)
            .collect(Collectors.toList());
    return new ErrorDTO(HttpStatus.BAD_REQUEST.value(), errors);
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  @ResponseBody
  public ErrorDTO handleAccessDeniedException(AccessDeniedException ex) {
    return new ErrorDTO(HttpStatus.FORBIDDEN.value(), Collections.singletonList(ex.getMessage()));
  }

  @ExceptionHandler(InvalidCredentialsException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ResponseBody
  public ErrorDTO handleInvalidCredentialsException(InvalidCredentialsException ex) {
    return new ErrorDTO(
        HttpStatus.UNAUTHORIZED.value(), Collections.singletonList(ex.getMessage()));
  }

  @ExceptionHandler(UserDisabledException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ResponseBody
  public ErrorDTO handleUserDisabledException(UserDisabledException ex) {
    return new ErrorDTO(
        HttpStatus.UNAUTHORIZED.value(), Collections.singletonList(ex.getMessage()));
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ResponseBody
  public ErrorDTO handleException(Exception ex) {
    return new ErrorDTO(
        HttpStatus.INTERNAL_SERVER_ERROR.value(), Collections.singletonList(ex.getMessage()));
  }
}
