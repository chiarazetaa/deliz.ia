package com.delizia.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import com.delizia.exception.EntityNotFoundException;
import com.delizia.model.domain.ItemEntity;
import com.delizia.model.dto.ItemDTO;
import com.delizia.repository.ItemRepository;
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
  void getSmoothieByIdOk() {
    ItemEntity smoothie = new ItemEntity(1L, "test", null, 0.0F);
    when(itemRepository.findById(1L)).thenReturn(Optional.of(smoothie));

    // Test
    ItemEntity res = service.getSmoothieById(1L);

    // Verify
    assertEquals(smoothie, res);
  }

  @Test
  void getSmoothieByIdNotFoundEx() {
    ItemEntity smoothie = new ItemEntity(1L, "test", null, 0.0F);
    when(itemRepository.findById(1L)).thenReturn(Optional.empty());

    // Test
    Exception exception =
        assertThrows(EntityNotFoundException.class, () -> service.getSmoothieById(1L));

    // Verify
    assertEquals("No smoothie found with id 1", exception.getMessage());
  }

  @Test
  void updateSmoothieByIdOk() {
    ItemDTO smoothie = new ItemDTO("test", null, 0.0F);
    when(itemRepository.findById(1L)).thenReturn(Optional.of(new ItemEntity()));

    // Test
    service.updateSmoothieById(1L, smoothie);
  }

  @Test
  void updateSmoothieByIdNotFoundEx() {
    ItemDTO smoothie = new ItemDTO("test", null, 0.0F);
    when(itemRepository.findById(1L)).thenReturn(Optional.empty());

    // Test
    Exception exception =
        assertThrows(EntityNotFoundException.class, () -> service.updateSmoothieById(1L, smoothie));

    // Verify
    assertEquals("No smoothie found with id 1", exception.getMessage());
  }

  @Test
  void deleteSmoothieByIdOk() {
    when(itemRepository.existsById(1L)).thenReturn(true);

    // Test
    service.deleteSmoothieById(1L);
  }

  @Test
  void deleteSmoothieByIdNotFoundEx() {
    when(itemRepository.existsById(1L)).thenReturn(false);

    // Test
    Exception exception =
        assertThrows(EntityNotFoundException.class, () -> service.deleteSmoothieById(1L));

    // Verify
    assertEquals("No smoothie found with id 1", exception.getMessage());
  }
}
