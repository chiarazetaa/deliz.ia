package com.delizia.model.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PatchDTO {

  @NotBlank
  @Pattern(regexp="^(add|remove|replace)$", message="{validation.patch.op.pattern.wrong}")
  private final String op;

  @NotBlank
  private final String path;

  @NotNull
  private final Object value;

}
