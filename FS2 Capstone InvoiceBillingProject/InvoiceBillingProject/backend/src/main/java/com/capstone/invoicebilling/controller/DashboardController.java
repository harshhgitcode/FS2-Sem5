package com.capstone.invoicebilling.controller;
import com.capstone.invoicebilling.model.Invoice; import com.capstone.invoicebilling.repository.InvoiceRepository;
import org.springframework.web.bind.annotation.*; import java.math.BigDecimal; import java.time.LocalDate; import java.util.*; import java.security.Principal;
@RestController @RequestMapping("/api/dashboard")
public class DashboardController {
 private final InvoiceRepository repo; public DashboardController(InvoiceRepository r){repo=r;}
 @GetMapping public Map<String,Object> dashboard(Principal p){
  List<Invoice> all=repo.findByUserIdOrderByCreatedAtDesc(p.getName());BigDecimal total=BigDecimal.ZERO,paid=BigDecimal.ZERO,pending=BigDecimal.ZERO;int overdue=0,paidCount=0,unpaidCount=0,partial=0;
  for(Invoice i:all){total=total.add(i.getTotal());paid=paid.add(i.getAmountPaid());pending=pending.add(i.getBalance());switch(i.getStatus()){case "PAID"->paidCount++;case "OVERDUE"->{overdue++;unpaidCount++;}case "PARTIALLY_PAID"->partial++;default->unpaidCount++;}}
  return Map.of("totalInvoices",all.size(),"totalBilled",total,"totalReceived",paid,"pendingAmount",pending,"overdueCount",overdue,"paidCount",paidCount,"unpaidCount",unpaidCount,"partialCount",partial,"recentInvoices",all.stream().limit(6).toList());
 }
}
