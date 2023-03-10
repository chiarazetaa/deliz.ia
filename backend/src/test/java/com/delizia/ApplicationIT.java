package com.delizia;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(classes = Application.class, webEnvironment = WebEnvironment.RANDOM_PORT)
public class ApplicationIT {

  private final MockMvc mvc;

  public ApplicationIT(@Autowired WebApplicationContext context) {
    mvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
  }

  // TEST USER

  @Test
  @WithMockUser(authorities = {"ROLE_USER"})
  @Sql({"classpath:data.sql"})
  public void getSmoothiesAsUser() throws Exception {
    MvcResult result =
        mvc.perform(get("/smoothies").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && resultAsStr.contains("\"id\":2")
            && resultAsStr.contains("\"id\":3"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_USER"})
  @Sql({"classpath:data.sql"})
  public void getSmoothieByIdAsUser() throws Exception {
    MvcResult result =
        mvc.perform(get("/smoothies/1").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && !resultAsStr.contains("\"id\":2")
            && !resultAsStr.contains("\"id\":3"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_USER"})
  @Sql({"classpath:data.sql"})
  public void putSmoothieByIdAsUser() throws Exception {
    String content = "{\"name\":\"test\",\"price\":5.9}";
    mvc.perform(
            put("/smoothies/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isForbidden());
  }

  @Test
  @WithMockUser(authorities = {"ROLE_USER"})
  @Sql({"classpath:data.sql"})
  public void deleteSmoothieByIdAsUser() throws Exception {
    mvc.perform(delete("/smoothies/1").with(csrf())).andExpect(status().isForbidden());
  }

  @Test
  @WithMockUser(authorities = {"ROLE_USER"})
  @Sql({"classpath:data.sql"})
  public void getSmoothieNutrientByIdAsUser() throws Exception {
    MvcResult result =
        mvc.perform(get("/smoothie-nutrients/1").with(csrf()))
            .andExpect(status().isOk())
            .andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && resultAsStr.contains("\"id\":2")
            && resultAsStr.contains("\"id\":3"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_USER"})
  @Sql({"classpath:data.sql"})
  public void postOrderAsUser() throws Exception {
    String content = "{\"smoothies\":[{\"smoothieId\":1,\"quantity\":2}]}";
    mvc.perform(
            post("/orders")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isCreated());
  }

  // TEST OWNER

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  @Sql({"classpath:data.sql"})
  public void getSmoothiesAsOwner() throws Exception {
    MvcResult result =
        mvc.perform(get("/smoothies").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && resultAsStr.contains("\"id\":2")
            && resultAsStr.contains("\"id\":3"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  @Sql({"classpath:data.sql"})
  public void getSmoothieByIdAsOwner() throws Exception {
    MvcResult result =
        mvc.perform(get("/smoothies/1").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && !resultAsStr.contains("\"id\":2")
            && !resultAsStr.contains("\"id\":3"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  @Sql({"classpath:data.sql"})
  public void putSmoothieByIdAsOwner() throws Exception {
    String content = "{\"name\":\"test\",\"price\":5.9}";
    mvc.perform(
            put("/smoothies/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isNoContent());

    MvcResult result =
        mvc.perform(get("/smoothies").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"name\":\"test\",\"price\":5.9")
            && !resultAsStr.contains("\"name\":\"Strawberry Galaxy\",\"price\":3.99"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  @Sql({"classpath:data.sql"})
  public void deleteSmoothieByIdAsOwner() throws Exception {
    mvc.perform(delete("/smoothies/1").with(csrf())).andExpect(status().isNoContent());

    MvcResult result =
        mvc.perform(get("/smoothies").with(csrf())).andExpect(status().isOk()).andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        !resultAsStr.contains("\"id\":1")
            && resultAsStr.contains("\"id\":2")
            && resultAsStr.contains("\"id\":3"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  @Sql({"classpath:data.sql"})
  public void getSmoothieNutrientByIdAsOwner() throws Exception {
    MvcResult result =
        mvc.perform(get("/smoothie-nutrients/1").with(csrf()))
            .andExpect(status().isOk())
            .andReturn();
    String resultAsStr = result.getResponse().getContentAsString();

    assertTrue(
        resultAsStr.contains("\"id\":1")
            && resultAsStr.contains("\"id\":2")
            && resultAsStr.contains("\"id\":3"));
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  @Sql({"classpath:data.sql"})
  public void postOrderAsOwner() throws Exception {
    String content = "{\"smoothies\":[{\"smoothieId\":1,\"quantity\":2}]}";
    mvc.perform(
            post("/orders")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isForbidden());
  }

  // EXTRA

  @Test
  @WithMockUser(authorities = {"ROLE_USER"})
  @Sql({"classpath:data.sql"})
  public void getSmoothieByNonExistingId() throws Exception {
    mvc.perform(get("/smoothies/10").with(csrf())).andExpect(status().isNotFound());
  }

  @Test
  @WithMockUser(authorities = {"ROLE_OWNER"})
  @Sql({"classpath:data.sql"})
  public void putSmoothieByIdWithMalformedData() throws Exception {
    String content = "{\"price\":5.9}";
    mvc.perform(
            put("/smoothies/2")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
        .andExpect(status().isBadRequest());
  }
}
