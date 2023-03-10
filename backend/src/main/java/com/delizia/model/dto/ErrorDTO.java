package com.delizia.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorDTO {

  private final Integer status;
  private final List<String> errors;
}
