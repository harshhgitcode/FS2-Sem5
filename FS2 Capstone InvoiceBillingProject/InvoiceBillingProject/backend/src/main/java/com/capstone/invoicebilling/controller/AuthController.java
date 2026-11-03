package com.capstone.invoicebilling.controller;
import com.capstone.invoicebilling.model.User; import com.capstone.invoicebilling.repository.UserRepository; import com.capstone.invoicebilling.security.JwtService;
import jakarta.validation.Valid; import jakarta.validation.constraints.*; import org.springframework.http.*; import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/auth")
public class AuthController {
 private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthController(UserRepository u,PasswordEncoder e,JwtService j){users=u;encoder=e;jwt=j;}
 public record AuthRequest(@NotBlank String name,@Email @NotBlank String email,@Size(min=8) String password){}
 public record LoginRequest(@Email @NotBlank String email,@NotBlank String password){}
 private Map<String,Object> response(User u){return Map.of("token",jwt.generate(u.getId(),u.getEmail()),"user",Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail()));}
 @PostMapping("/register") public ResponseEntity<?> register(@Valid @RequestBody AuthRequest r){
  if(users.findByEmail(r.email().toLowerCase()).isPresent())return ResponseEntity.badRequest().body(Map.of("message","An account with this email already exists"));
  User u=new User();u.setName(r.name().trim());u.setEmail(r.email().toLowerCase().trim());u.setPassword(encoder.encode(r.password()));return ResponseEntity.ok(response(users.save(u)));
 }
 @PostMapping("/login") public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r){
  var u=users.findByEmail(r.email().toLowerCase().trim()).orElse(null);
  if(u==null||!encoder.matches(r.password(),u.getPassword()))return ResponseEntity.status(401).body(Map.of("message","Invalid email or password"));
  return ResponseEntity.ok(response(u));
 }
}
