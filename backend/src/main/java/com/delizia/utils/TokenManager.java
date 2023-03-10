package com.delizia.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.io.Serial;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class TokenManager implements Serializable {

  public static final long TOKEN_VALIDITY = 8 * 60 * 60; // seconds
  @Serial private static final long serialVersionUID = 7858367682395464L;

  @Value("${jwt.secret}")
  private String jwtSecret;

  public String generateJwtToken(UserDetails userDetails) {
    return Jwts.builder()
        .claim("AUTHORITIES", userDetails.getAuthorities())
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
        .signWith(
            Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)),
            SignatureAlgorithm.HS512)
        .compact();
  }

  public Boolean validateJwtToken(String token, UserDetails userDetails) {
    Claims claims =
        Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)))
            .build()
            .parseClaimsJws(token)
            .getBody();

    boolean isUsernameCorrect = claims.getSubject().equals(userDetails.getUsername());
    boolean isTokenExpired = claims.getExpiration().before(new Date());
    return isUsernameCorrect && !isTokenExpired;
  }

  public String getUsernameFromToken(String token) {
    final Claims claims =
        Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)))
            .build()
            .parseClaimsJws(token)
            .getBody();
    return claims.getSubject();
  }
}
