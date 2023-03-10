package com.delizia.controller;

import com.delizia.exception.InvalidCredentialsException;
import com.delizia.model.auth.JWTResponse;
import com.delizia.utils.TokenManager;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "login", produces = "application/json")
public class LoginController {

  private final UserDetailsService userDetailsService;
  private final AuthenticationManager authenticationManager;
  private final TokenManager tokenManager;

  public LoginController(
      @Autowired UserDetailsService userDetailsService,
      @Autowired AuthenticationManager authenticationManager,
      @Autowired TokenManager tokenManager) {
    this.userDetailsService = userDetailsService;
    this.authenticationManager = authenticationManager;
    this.tokenManager = tokenManager;
  }

  @PostMapping
  public JWTResponse authenticateUser(@RequestHeader("Authorization") String authorization)
      throws Exception {
    if (authorization != null && authorization.startsWith("Basic")) {
      final String base64Credentials = authorization.substring("Basic".length()).trim();
      final byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
      final String cred = new String(credDecoded, StandardCharsets.UTF_8);
      final String[] credentials = cred.split(":", 2);

      try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(credentials[0], credentials[1]));
      } catch (DisabledException e) {
        throw new Exception("This user is not enabled.", e);
      } catch (BadCredentialsException e) {
        throw new InvalidCredentialsException("The credentials provided are invalid.");
      }

      final UserDetails userDetails = userDetailsService.loadUserByUsername(credentials[0]);
      return new JWTResponse(tokenManager.generateJwtToken(userDetails));
    } else {
      throw new Exception("Users can only login trough Basic authentication.");
    }
  }
}
