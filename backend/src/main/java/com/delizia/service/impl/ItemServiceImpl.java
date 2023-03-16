package com.delizia.service.impl;

import com.delizia.exception.EntityNotFoundException;
import com.delizia.model.domain.ItemEntity;
import com.delizia.model.dto.ItemDTO;
import com.delizia.model.dto.PatchDTO;
import com.delizia.repository.ItemRepository;
import com.delizia.service.ItemService;
import com.google.common.collect.Iterables;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

  private final ItemRepository itemRepository;

  public ItemServiceImpl(@Autowired ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  @Override
  public ItemEntity[] getItems() {
    return Iterables.toArray(itemRepository.findAll(), ItemEntity.class);
  }

  @Override
  public ItemEntity getItemById(Long id) {
    Optional<ItemEntity> entity = itemRepository.findById(id);
    if (entity.isEmpty()) {
      throw new EntityNotFoundException(String.format("No item found with id %d", id));
    }

    return entity.get();
  }

  @PreAuthorize("hasRole('ROLE_OWNER')")
  @Override
  public void addNewItem(ItemDTO dto) {
    ItemEntity e = new ItemEntity();
    e.replaceAllValues(dto);
    itemRepository.save(e);
  }

  @PreAuthorize("hasRole('ROLE_OWNER')")
  @Override
  public void updateItemById(Long id, ItemDTO dto) {
    Optional<ItemEntity> entity = itemRepository.findById(id);
    if (entity.isEmpty()) {
      throw new EntityNotFoundException(String.format("No item found with id %d", id));
    }

    ItemEntity e = entity.get();
    e.replaceAllValues(dto);
    itemRepository.save(e);
  }

  @PreAuthorize("hasRole('ROLE_OWNER')")
  @Override
  public void patchItemById(Long id, List<PatchDTO> patchDTOList) {
    Optional<ItemEntity> entity = itemRepository.findById(id);
    if (entity.isEmpty()) {
      throw new EntityNotFoundException(String.format("No item found with id %d", id));
    }

    ItemEntity e = entity.get();
    for (PatchDTO patchDTO : patchDTOList) {
      String setterMethod =
          "set"
              + patchDTO.getPath().substring(0, 1).toUpperCase()
              + patchDTO.getPath().substring(1).toLowerCase();

      Optional<Method> method =
          Arrays.stream(e.getClass().getDeclaredMethods())
              .filter(methodName -> methodName.getName().equals(setterMethod))
              .findAny();

      if (method.isEmpty()) continue;

      try {
        switch (patchDTO.getOp()) {
          case "add", "replace" -> method.get().invoke(e, patchDTO.getValue());
          case "remove" -> method.get().invoke(e, (Object) null);
        }
      } catch (IllegalAccessException | InvocationTargetException ignore) {
      }
    }
    itemRepository.save(e);
  }

  @PreAuthorize("hasRole('ROLE_OWNER')")
  @Override
  public void deleteItemById(Long id) {
    if (!itemRepository.existsById(id)) {
      throw new EntityNotFoundException(String.format("No item found with id %d", id));
    }

    itemRepository.deleteById(id);
  }
}
