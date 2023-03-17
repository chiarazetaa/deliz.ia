package com.delizia.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import com.delizia.exception.EntityNotFoundException;
import com.delizia.model.domain.ItemEntity;
import com.delizia.model.dto.ItemDTO;
import com.delizia.model.dto.PatchDTO;
import com.delizia.repository.ItemRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ItemServiceImplTest {

  @InjectMocks private ItemServiceImpl service;

  @Mock private ItemRepository itemRepository;

  @Test
  void getItemByIdOk() {
    ItemEntity item = new ItemEntity(1L, "test", null, 1.0);
    when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

    // Test
    ItemEntity res = service.getItemById(1L);

    // Verify
    assertEquals(item, res);
  }

  @Test
  void getItemByIdNotFoundEx() {
    when(itemRepository.findById(1L)).thenReturn(Optional.empty());

    // Test
    Exception exception =
        assertThrows(EntityNotFoundException.class, () -> service.getItemById(1L));

    // Verify
    assertEquals("No item found with id 1", exception.getMessage());
  }

  // TODO: test addNewItem()

  @Test
  void updateItemByIdOk() {
    ItemDTO item = new ItemDTO("test", null, 1.0);
    when(itemRepository.findById(1L)).thenReturn(Optional.of(new ItemEntity()));

    // Test
    service.updateItemById(1L, item);
  }

  @Test
  void updateItemByIdNotFoundEx() {
    ItemDTO item = new ItemDTO("test", null, 1.0);
    when(itemRepository.findById(1L)).thenReturn(Optional.empty());

    // Test
    Exception exception =
        assertThrows(EntityNotFoundException.class, () -> service.updateItemById(1L, item));

    // Verify
    assertEquals("No item found with id 1", exception.getMessage());
  }

  @Test
  void patchItemByIdOk() {
    ItemEntity entity = new ItemEntity();
    entity.setDescription("test");
    entity.setPrice(0.0);

    ItemEntity expected = new ItemEntity();
    expected.setName("X");
    expected.setPrice(1.0);

    when(itemRepository.findById(1L)).thenReturn(Optional.of(entity));

    List<PatchDTO> patchDTOList = List.of(
      new PatchDTO("add", "name", "X"),
      new PatchDTO("remove", "description", null),
      new PatchDTO("replace", "price", 1.0),
      new PatchDTO("doesNotExist", "price", 1.0),
      new PatchDTO("replace", "doesNotExist", "")
    );

    // Test
    service.patchItemById(1L, patchDTOList);

    // Verify
    assertEquals(expected, entity);
  }

  @Test
  void patchItemByIdNotFoundEx() {
    when(itemRepository.findById(1L)).thenReturn(Optional.empty());

    // Test
    Exception exception =
        assertThrows(EntityNotFoundException.class, () -> service.patchItemById(1L, List.of()));

    // Verify
    assertEquals("No item found with id 1", exception.getMessage());
  }
  
  @Test
  void deleteItemByIdOk() {
    when(itemRepository.existsById(1L)).thenReturn(true);

    // Test
    service.deleteItemById(1L);
  }

  @Test
  void deleteItemByIdNotFoundEx() {
    when(itemRepository.existsById(1L)).thenReturn(false);

    // Test
    Exception exception =
        assertThrows(EntityNotFoundException.class, () -> service.deleteItemById(1L));

    // Verify
    assertEquals("No item found with id 1", exception.getMessage());
  }
}
