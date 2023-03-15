package com.delizia.service;

import com.delizia.model.domain.ItemEntity;
import com.delizia.model.dto.ItemDTO;
import com.delizia.model.dto.PatchDTO;
import java.util.List;

public interface ItemService {

  ItemEntity[] getSmoothies();

  ItemEntity getSmoothieById(Long id);

  void updateSmoothieById(Long id, ItemDTO dto);

  void patchSmoothieById(Long id, List<PatchDTO> patchDTO);

  void deleteSmoothieById(Long id);
}
