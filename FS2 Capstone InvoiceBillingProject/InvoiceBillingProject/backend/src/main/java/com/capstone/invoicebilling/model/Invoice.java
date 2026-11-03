package com.capstone.invoicebilling.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
@Document("invoices")
public class Invoice {
 @Id private String id; private String userId; private String customerId; private String customerName;
 private String invoiceNumber; private LocalDate issueDate; private LocalDate dueDate;
 private List<Item> items=new ArrayList<>(); private BigDecimal subtotal=BigDecimal.ZERO;
 private BigDecimal taxRate=BigDecimal.ZERO; private BigDecimal taxAmount=BigDecimal.ZERO;
 private BigDecimal total=BigDecimal.ZERO; private BigDecimal amountPaid=BigDecimal.ZERO;
 private String notes; private Instant createdAt=Instant.now();
 public static class Item {
  private String description; private BigDecimal quantity=BigDecimal.ONE; private BigDecimal unitPrice=BigDecimal.ZERO; private BigDecimal amount=BigDecimal.ZERO;
  public String getDescription(){return description;} public void setDescription(String v){description=v;}
  public BigDecimal getQuantity(){return quantity;} public void setQuantity(BigDecimal v){quantity=v;}
  public BigDecimal getUnitPrice(){return unitPrice;} public void setUnitPrice(BigDecimal v){unitPrice=v;}
  public BigDecimal getAmount(){return amount;} public void setAmount(BigDecimal v){amount=v;}
 }
 public String getStatus(){ if(total!=null && amountPaid!=null && amountPaid.compareTo(total)>=0)return "PAID"; if(amountPaid!=null && amountPaid.compareTo(BigDecimal.ZERO)>0)return "PARTIALLY_PAID"; if(dueDate!=null && dueDate.isBefore(LocalDate.now()))return "OVERDUE"; return "UNPAID"; }
 public BigDecimal getBalance(){return (total==null?BigDecimal.ZERO:total).subtract(amountPaid==null?BigDecimal.ZERO:amountPaid).max(BigDecimal.ZERO);}
 public String getId(){return id;} public void setId(String v){id=v;}
 public String getUserId(){return userId;} public void setUserId(String v){userId=v;}
 public String getCustomerId(){return customerId;} public void setCustomerId(String v){customerId=v;}
 public String getCustomerName(){return customerName;} public void setCustomerName(String v){customerName=v;}
 public String getInvoiceNumber(){return invoiceNumber;} public void setInvoiceNumber(String v){invoiceNumber=v;}
 public LocalDate getIssueDate(){return issueDate;} public void setIssueDate(LocalDate v){issueDate=v;}
 public LocalDate getDueDate(){return dueDate;} public void setDueDate(LocalDate v){dueDate=v;}
 public List<Item> getItems(){return items;} public void setItems(List<Item> v){items=v;}
 public BigDecimal getSubtotal(){return subtotal;} public void setSubtotal(BigDecimal v){subtotal=v;}
 public BigDecimal getTaxRate(){return taxRate;} public void setTaxRate(BigDecimal v){taxRate=v;}
 public BigDecimal getTaxAmount(){return taxAmount;} public void setTaxAmount(BigDecimal v){taxAmount=v;}
 public BigDecimal getTotal(){return total;} public void setTotal(BigDecimal v){total=v;}
 public BigDecimal getAmountPaid(){return amountPaid;} public void setAmountPaid(BigDecimal v){amountPaid=v;}
 public String getNotes(){return notes;} public void setNotes(String v){notes=v;}
 public Instant getCreatedAt(){return createdAt;}
}
