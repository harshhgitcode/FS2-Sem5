package com.capstone.invoicebilling.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
@Document("payments")
public class Payment {
 @Id private String id; private String userId; private String invoiceId; private BigDecimal amount;
 private LocalDate paymentDate; private String method; private String reference; private Instant createdAt=Instant.now();
 public String getId(){return id;} public void setId(String v){id=v;}
 public String getUserId(){return userId;} public void setUserId(String v){userId=v;}
 public String getInvoiceId(){return invoiceId;} public void setInvoiceId(String v){invoiceId=v;}
 public BigDecimal getAmount(){return amount;} public void setAmount(BigDecimal v){amount=v;}
 public LocalDate getPaymentDate(){return paymentDate;} public void setPaymentDate(LocalDate v){paymentDate=v;}
 public String getMethod(){return method;} public void setMethod(String v){method=v;}
 public String getReference(){return reference;} public void setReference(String v){reference=v;}
 public Instant getCreatedAt(){return createdAt;}
}
