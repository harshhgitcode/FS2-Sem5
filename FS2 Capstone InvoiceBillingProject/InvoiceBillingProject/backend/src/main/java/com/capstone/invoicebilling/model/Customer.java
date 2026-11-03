package com.capstone.invoicebilling.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
@Document("customers")
public class Customer {
 @Id private String id; private String userId; private String name; private String email;
 private String phone; private String address; private Instant createdAt=Instant.now();
 public String getId(){return id;} public void setId(String v){id=v;}
 public String getUserId(){return userId;} public void setUserId(String v){userId=v;}
 public String getName(){return name;} public void setName(String v){name=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
 public String getAddress(){return address;} public void setAddress(String v){address=v;}
 public Instant getCreatedAt(){return createdAt;}
}
