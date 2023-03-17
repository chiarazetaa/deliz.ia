package com.delizia.controller;

import com.delizia.model.domain.ItemEntity;
import com.delizia.model.dto.ItemDTO;
import com.delizia.model.dto.PatchDTO;
import com.delizia.service.ItemService;
import com.sun.istack.NotNull;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "items", produces = "application/json")
public class ItemController {

  private final ItemService itemService;

  public ItemController(@Autowired ItemService itemService) {
    this.itemService = itemService;
  }

  @GetMapping
  public ItemEntity[] getItems() {
    return itemService.getItems();
  }

  @GetMapping("/{id}")
  public ItemEntity getItemById(@PathVariable @NotNull Long id) {
    return itemService.getItemById(id);
  }

  @PostMapping("/{id}")
  @ResponseStatus(HttpStatus.CREATED)
  public void addItem(@RequestBody @Validated ItemDTO itemDTO) {
    itemService.addNewItem(itemDTO);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updateItemById(
      @PathVariable @NotNull Long id, @RequestBody @Validated ItemDTO itemDTO) {
    itemService.updateItemById(id, itemDTO);
  }

  @PatchMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void patchItemById(
      @PathVariable @NotNull Long id, @RequestBody @Validated List<PatchDTO> patchDTO) {
    itemService.patchItemById(id, patchDTO);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteItemById(@PathVariable @NotNull Long id) {
    itemService.deleteItemById(id);
  }
}
