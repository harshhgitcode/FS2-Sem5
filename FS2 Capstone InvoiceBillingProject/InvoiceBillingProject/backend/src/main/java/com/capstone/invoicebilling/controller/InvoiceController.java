package com.capstone.invoicebilling.controller;
import com.capstone.invoicebilling.model.*; import com.capstone.invoicebilling.repository.*; import com.capstone.invoicebilling.service.BillingService;
import jakarta.validation.Valid; import jakarta.validation.constraints.*; import org.springframework.http.*; import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal; import java.time.LocalDate; import java.util.*; import java.security.Principal;
@RestController @RequestMapping("/api/invoices")
public class InvoiceController {
 private final InvoiceRepository invoices; private final PaymentRepository payments; private final BillingService billing;
 public InvoiceController(InvoiceRepository i,PaymentRepository p,BillingService b){invoices=i;payments=p;billing=b;}
 @GetMapping public List<Invoice> all(Principal p){return invoices.findByUserIdOrderByCreatedAtDesc(p.getName());}
 @PostMapping public Invoice create(@RequestBody Invoice x,Principal p){x.setInvoiceNumber(billing.nextNumber(p.getName()));return invoices.save(billing.calculate(x,p.getName()));}
 @GetMapping("/{id}") public Invoice get(@PathVariable String id,Principal p){return owned(id,p);}
 @PutMapping("/{id}") public Invoice update(@PathVariable String id,@RequestBody Invoice x,Principal p){Invoice old=owned(id,p);x.setId(old.getId());x.setInvoiceNumber(old.getInvoiceNumber());x.setAmountPaid(old.getAmountPaid());return invoices.save(billing.calculate(x,p.getName()));}
 @DeleteMapping("/{id}") public ResponseEntity<?> delete(@PathVariable String id,Principal p){owned(id,p);invoices.deleteByIdAndUserId(id,p.getName());return ResponseEntity.noContent().build();}
 public record PaymentRequest(@NotNull @DecimalMin("0.01") BigDecimal amount,@NotNull LocalDate paymentDate,String method,String reference){}
 @PostMapping("/{id}/payments") public Payment pay(@PathVariable String id,@Valid @RequestBody PaymentRequest r,Principal p){
  Invoice inv=owned(id,p); if(r.amount().compareTo(inv.getBalance())>0)throw new IllegalArgumentException("Payment exceeds outstanding balance");
  Payment pay=new Payment();pay.setUserId(p.getName());pay.setInvoiceId(id);pay.setAmount(r.amount());pay.setPaymentDate(r.paymentDate());pay.setMethod(r.method());pay.setReference(r.reference());payments.save(pay);
  inv.setAmountPaid(inv.getAmountPaid().add(r.amount()));invoices.save(inv);return pay;
 }
 @GetMapping("/{id}/payments") public List<Payment> paymentList(@PathVariable String id,Principal p){owned(id,p);return payments.findByInvoiceIdAndUserIdOrderByPaymentDateDesc(id,p.getName());}
 private Invoice owned(String id,Principal p){return invoices.findByIdAndUserId(id,p.getName()).orElseThrow(()->new NoSuchElementException("Invoice not found"));}
}
