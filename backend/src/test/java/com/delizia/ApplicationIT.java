package com.delizia;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(classes = Application.class, webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase
public class ApplicationIT {

  private final MockMvc mvc;

  public ApplicationIT(@Autowired WebApplicationContext context) {
    mvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
  }

  // TEST ANONYMOUS USER

  @Test
  @WithMockUser(authorities = {"ROLE_ANONYMOUS"})
  public void getItemsAsAnonymous() throws Exception {
    MvcResult result =
        mvc.perform(get("/items").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && resultAsStr.contains("\"id\":2")
            && resultAsStr.contains("\"id\":3")
            && resultAsStr.contains("\"id\":4"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_ANONYMOUS"})
  public void getItemByIdAsAnonymous() throws Exception {
    MvcResult result =
        mvc.perform(get("/items/1").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && !resultAsStr.contains("\"id\":2")
            && !resultAsStr.contains("\"id\":3")
            && !resultAsStr.contains("\"id\":4"));
  }

  // TODO: test addNewItem()

  @Test
  @WithMockUser(authorities = {"ROLE_ANONYMOUS"})
  public void putItemByIdAsAnonymous() throws Exception {
    String content = "{\"name\":\"test\",\"price\":5.9}";
    mvc.perform(
            put("/items/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isForbidden());
  }

  @Test
  @WithMockUser(authorities = {"ROLE_ANONYMOUS"})
  public void patchItemByIdAsAnonymous() throws Exception {
    String content = "[{\"op\":\"replace\",\"path\":\"name\",\"value\":\"X\"}]";
    mvc.perform(
            patch("/items/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isForbidden());
  }

  @Test
  @WithMockUser(authorities = {"ROLE_ANONYMOUS"})
  public void deleteItemByIdAsAnonymous() throws Exception {
    mvc.perform(delete("/items/1").with(csrf())).andExpect(status().isForbidden());
  }

  // TEST OWNER

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  public void getItemsAsOwner() throws Exception {
    MvcResult result =
        mvc.perform(get("/items").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && resultAsStr.contains("\"id\":2")
            && resultAsStr.contains("\"id\":3")
            && resultAsStr.contains("\"id\":4"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  public void getItemByIdAsOwner() throws Exception {
    MvcResult result =
        mvc.perform(get("/items/1").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && !resultAsStr.contains("\"id\":2")
            && !resultAsStr.contains("\"id\":3")
            && !resultAsStr.contains("\"id\":4"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  public void putItemByIdAsOwner() throws Exception {
    String content = "{\"name\":\"test\",\"description\":\"test\",\"price\":5.9}";
    mvc.perform(
            put("/items/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isNoContent());

    MvcResult result =
        mvc.perform(get("/items").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"name\":\"test\",\"description\":\"test\",\"price\":5.9")
            && !resultAsStr.contains("\"name\":\"A\",\"description\":\"a\",\"price\":3.99"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  public void patchItemByIdAsOwner() throws Exception {
    String content =
        "[{\"op\":\"add\",\"path\":\"name\",\"value\":\"test\"},{\"op\":\"replace\",\"path\":\"price\",\"value\":5.9},{\"op\":\"remove\",\"path\":\"description\"}]";
    mvc.perform(
            patch("/items/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isNoContent());

    MvcResult result =
        mvc.perform(get("/items").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"name\":\"test\",\"price\":5.9")
            && !resultAsStr.contains("\"name\":\"A\",\"description\":\"a\",\"price\":3.99"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  public void deleteItemByIdAsOwner() throws Exception {
    mvc.perform(delete("/items/1").with(csrf())).andExpect(status().isNoContent());

    MvcResult result =
        mvc.perform(get("/items").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        !resultAsStr.contains("\"id\":1")
            && resultAsStr.contains("\"id\":2")
            && resultAsStr.contains("\"id\":3")
            && resultAsStr.contains("\"id\":4"));
  }

  // MISCELLANEOUS

  @Test
  @WithMockUser(authorities = {"ROLE_ANONYMOUS"})
  public void getItemByNonExistingId() throws Exception {
    mvc.perform(get("/items/10").with(csrf())).andExpect(status().isNotFound());
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  public void putItemByIdWithMalformedData() throws Exception {
    String content = "{\"name\":\"test\",\"description\":\"test\",\"price\":-1.0}";
    mvc.perform(
            put("/items/2")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isBadRequest());
  }
}
