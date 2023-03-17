package com.delizia.model.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.google.common.base.Objects;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tbl_tag")
public class TagEntity {

  @Id private String id;

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TagEntity tagEntity = (TagEntity) o;
    return Objects.equal(id, tagEntity.id);
  }

  @Override
  public String toString() {
    return "TagEntity{" +
        "id='" + id + '\'' +
        '}';
  }
}
