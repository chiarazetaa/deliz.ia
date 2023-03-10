package com.delizia.service;

import com.delizia.model.domain.ItemEntity;
import com.delizia.model.dto.ItemDTO;

public interface ItemService {

  ItemEntity[] getSmoothies();

  ItemEntity getSmoothieById(Long id);

  void updateSmoothieById(Long id, ItemDTO dto);

  void deleteSmoothieById(Long id);
}
