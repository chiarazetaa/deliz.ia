package com.delizia.service;

import com.delizia.model.domain.ItemEntity;
import com.delizia.model.dto.ItemDTO;
import com.delizia.model.dto.PatchDTO;
import java.util.List;

public interface ItemService {

  ItemEntity[] getItems();

  ItemEntity getItemById(Long id);

  void addNewItem(ItemDTO dto);

  void updateItemById(Long id, ItemDTO dto);

  void patchItemById(Long id, List<PatchDTO> patchDTO);

  void deleteItemById(Long id);
}
