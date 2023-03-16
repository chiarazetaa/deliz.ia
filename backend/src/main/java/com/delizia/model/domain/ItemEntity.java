package com.delizia.model.domain;

import com.delizia.model.dto.ItemDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.google.common.base.Objects;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(Include.NON_NULL)
@Entity(name = "tbl_item")
public class ItemEntity {

  @ManyToMany
  @JoinTable(
      name = "tbl_item_tag",
      joinColumns = @JoinColumn(name = "item_id"),
      inverseJoinColumns = @JoinColumn(name = "tag_id"))
  private final Set<TagEntity> tags = new HashSet<>();

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(unique = true, nullable = false)
  private String name;

  @Column private String description;

  @Column(nullable = false)
  private Double price;

  public void replaceAllValues(ItemDTO dto) {
    name = dto.getName() != null ? dto.getName() : name;
    description = dto.getDescription() != null ? dto.getDescription() : description;
    price = dto.getPrice() != null ? dto.getPrice() : price;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ItemEntity entity = (ItemEntity) o;
    return Objects.equal(tags, entity.tags)
        && Objects.equal(id, entity.id)
        && Objects.equal(name, entity.name)
        && Objects.equal(description, entity.description)
        && Objects.equal(price, entity.price);
  }

  @Override
  public String toString() {
    return "ItemEntity{" +
        "tags=" + tags +
        ", id=" + id +
        ", name='" + name + '\'' +
        ", description='" + description + '\'' +
        ", price=" + price +
        '}';
  }
}
