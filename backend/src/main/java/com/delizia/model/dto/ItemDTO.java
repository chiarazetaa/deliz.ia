package com.delizia.model.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ItemDTO {

  @Size(min = 1, message = "{validation.item.name.size.too_short}")
  @Size(min = 100, message = "{validation.item.name.size.too_long}")
  private final String name;

  @Size(min = 1, message = "{validation.item.description.size.too_short}")
  @Size(min = 500, message = "{validation.item.description.size.too_long}")
  private final String description;

  @Min(value = 0, message = "{validation.item.price.negative}")
  private final Float price;
}
