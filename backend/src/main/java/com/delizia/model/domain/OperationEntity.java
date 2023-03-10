package com.delizia.model.domain;

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
@Entity(name = "tbl_operation")
public class OperationEntity implements GrantedAuthority {

  @Id private String id;

  @Override
  public String getAuthority() {
    return id;
  }
}
