package com.capstone.invoicebilling.service;
import com.capstone.invoicebilling.model.*; import com.capstone.invoicebilling.repository.*;
import org.springframework.stereotype.Service; import java.math.*; import java.time.*; import java.util.*;
@Service
public class BillingService {
 private final InvoiceRepository invoices; private final CustomerRepository customers;
 public BillingService(InvoiceRepository i,CustomerRepository c){invoices=i;customers=c;}
 public Invoice calculate(Invoice x,String userId){
  var customer=customers.findByIdAndUserId(x.getCustomerId(),userId).orElseThrow(()->new IllegalArgumentException("Customer not found"));
  x.setUserId(userId); x.setCustomerName(customer.getName());
  if(x.getItems()==null||x.getItems().isEmpty())throw new IllegalArgumentException("Add at least one invoice item");
  BigDecimal sub=BigDecimal.ZERO;
  for(var item:x.getItems()){if(item.getQuantity()==null||item.getUnitPrice()==null||item.getQuantity().signum()<=0||item.getUnitPrice().signum()<0)throw new IllegalArgumentException("Invalid item quantity or price"); item.setAmount(item.getQuantity().multiply(item.getUnitPrice()).setScale(2,RoundingMode.HALF_UP)); sub=sub.add(item.getAmount());}
  BigDecimal rate=x.getTaxRate()==null?BigDecimal.ZERO:x.getTaxRate(); if(rate.signum()<0||rate.compareTo(new BigDecimal("100"))>0)throw new IllegalArgumentException("Tax rate must be between 0 and 100");
  x.setSubtotal(sub.setScale(2,RoundingMode.HALF_UP)); x.setTaxRate(rate); x.setTaxAmount(sub.multiply(rate).divide(new BigDecimal("100"),2,RoundingMode.HALF_UP)); x.setTotal(x.getSubtotal().add(x.getTaxAmount())); if(x.getAmountPaid()==null)x.setAmountPaid(BigDecimal.ZERO);
  if(x.getIssueDate()==null)x.setIssueDate(LocalDate.now()); if(x.getDueDate()==null)x.setDueDate(x.getIssueDate().plusDays(15));
  return x;
 }
 public String nextNumber(String userId){return "INV-"+String.format("%04d",invoices.findByUserIdOrderByCreatedAtDesc(userId).size()+1);}
}
