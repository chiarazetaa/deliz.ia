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
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(Include.NON_NULL)
@Entity(name = "tbl_role")
public class RoleEntity implements GrantedAuthority {

  @Id private String id;

  @Override
  public String getAuthority() {
    return id;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RoleEntity that = (RoleEntity) o;
    return Objects.equal(id, that.id);
  }

  @Override
  public String toString() {
    return "RoleEntity{" +
        "id='" + id + '\'' +
        '}';
  }
}
