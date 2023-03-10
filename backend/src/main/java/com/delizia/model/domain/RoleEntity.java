package com.delizia.model.domain;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tbl_role")
public class RoleEntity implements GrantedAuthority {

  @ManyToMany
  @JoinTable(
      name = "tbl_role_operation",
      joinColumns = @JoinColumn(name = "role_id"),
      inverseJoinColumns = @JoinColumn(name = "operation_id"))
  private final List<OperationEntity> allowedOperations = new ArrayList<>();
  @Id private String id;

  @Override
  public String getAuthority() {
    return id;
  }
}
