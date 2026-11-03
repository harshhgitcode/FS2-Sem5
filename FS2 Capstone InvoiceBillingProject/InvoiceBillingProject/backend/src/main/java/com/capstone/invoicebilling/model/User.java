package com.capstone.invoicebilling.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
@Document("users")
public class User {
 @Id private String id;
 @Indexed(unique=true) private String email;
 private String name;
 private String password;
 private Instant createdAt=Instant.now();
 public String getId(){return id;} public void setId(String v){id=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getName(){return name;} public void setName(String v){name=v;}
 public String getPassword(){return password;} public void setPassword(String v){password=v;}
 public Instant getCreatedAt(){return createdAt;}
}
