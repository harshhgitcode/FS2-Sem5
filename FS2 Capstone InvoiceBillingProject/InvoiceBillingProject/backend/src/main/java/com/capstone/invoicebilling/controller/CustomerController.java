package com.capstone.invoicebilling.controller;
import com.capstone.invoicebilling.model.Customer; import com.capstone.invoicebilling.repository.CustomerRepository;
import jakarta.validation.Valid; import jakarta.validation.constraints.*; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/customers")
public class CustomerController {
 private final CustomerRepository repo; public CustomerController(CustomerRepository r){repo=r;}
 public record CustomerRequest(@NotBlank String name,@Email String email,String phone,String address){}
 @GetMapping public List<Customer> all(java.security.Principal p){return repo.findByUserIdOrderByCreatedAtDesc(p.getName());}
 @PostMapping public Customer create(@Valid @RequestBody CustomerRequest r,java.security.Principal p){Customer c=new Customer();apply(c,r);c.setUserId(p.getName());return repo.save(c);}
 @GetMapping("/{id}") public Customer get(@PathVariable String id,java.security.Principal p){return owned(id,p);}
 @PutMapping("/{id}") public Customer update(@PathVariable String id,@Valid @RequestBody CustomerRequest r,java.security.Principal p){Customer c=owned(id,p);apply(c,r);return repo.save(c);}
 @DeleteMapping("/{id}") public ResponseEntity<?> delete(@PathVariable String id,java.security.Principal p){owned(id,p);repo.deleteByIdAndUserId(id,p.getName());return ResponseEntity.noContent().build();}
 private Customer owned(String id,java.security.Principal p){return repo.findByIdAndUserId(id,p.getName()).orElseThrow(()->new NoSuchElementException("Customer not found"));}
 private void apply(Customer c,CustomerRequest r){c.setName(r.name().trim());c.setEmail(r.email());c.setPhone(r.phone());c.setAddress(r.address());}
}
