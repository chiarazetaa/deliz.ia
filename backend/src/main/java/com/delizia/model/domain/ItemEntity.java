package com.delizia.model.domain;

import com.delizia.model.dto.ItemDTO;
import java.util.HashSet;
import java.util.Objects;
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
@Entity(name = "tbl_item")
public class ItemEntity {

  @ManyToMany
  @JoinTable(
      name = "tbl_item_tag",
      joinColumns = @JoinColumn(name = "tbl_item_id"),
      inverseJoinColumns = @JoinColumn(name = "tbl_tag_id"))
  private final Set<TagEntity> tags = new HashSet<>();

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(unique = true, nullable = false)
  private String name;

  @Column private String description;

  @Column(nullable = false)
  private Float price;

  public void updateValues(ItemDTO dto) {
    name = dto.getName() != null ? dto.getName() : name;
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

    ItemEntity that = (ItemEntity) o;

    if (!id.equals(that.id)) {
      return false;
    }
    if (!name.equals(that.name)) {
      return false;
    }
    if (!Objects.equals(description, that.description)) {
      return false;
    }
    if (!price.equals(that.price)) {
      return false;
    }
    return tags != null ? tags.equals(that.tags) : that.tags == null;
  }
}
