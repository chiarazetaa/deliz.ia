package com.delizia.service.impl;

import com.delizia.exception.EntityNotFoundException;
import com.delizia.model.domain.ItemEntity;
import com.delizia.model.dto.ItemDTO;
import com.delizia.repository.ItemRepository;
import com.delizia.service.ItemService;
import com.google.common.collect.Iterables;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

  private final ItemRepository itemRepository;

  public ItemServiceImpl(@Autowired ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  @Override
  public ItemEntity[] getSmoothies() {
    return Iterables.toArray(itemRepository.findAll(), ItemEntity.class);
  }

  @Override
  public ItemEntity getSmoothieById(Long id) {
    Optional<ItemEntity> entity = itemRepository.findById(id);
    if (entity.isEmpty()) {
      throw new EntityNotFoundException(String.format("No item found with id %d", id));
    }

    return entity.get();
  }

  @Override
  public void updateSmoothieById(Long id, ItemDTO dto) {
    Optional<ItemEntity> entity = itemRepository.findById(id);
    if (entity.isEmpty()) {
      throw new EntityNotFoundException(String.format("No item found with id %d", id));
    }

    ItemEntity e = entity.get();
    e.updateValues(dto);
    itemRepository.save(e);
  }

  @Override
  public void deleteSmoothieById(Long id) {
    if (!itemRepository.existsById(id)) {
      throw new EntityNotFoundException(String.format("No item found with id %d", id));
    }

    itemRepository.deleteById(id);
  }
}
