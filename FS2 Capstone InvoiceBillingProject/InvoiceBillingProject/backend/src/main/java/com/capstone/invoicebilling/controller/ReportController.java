package com.capstone.invoicebilling.controller;
import com.capstone.invoicebilling.model.Invoice; import com.capstone.invoicebilling.repository.InvoiceRepository; import com.capstone.invoicebilling.service.PdfService;
import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.time.LocalDate; import java.util.*; import java.security.Principal;
@RestController @RequestMapping("/api")
public class ReportController {
 private final InvoiceRepository invoices; private final PdfService pdf;
 public ReportController(InvoiceRepository i,PdfService p){invoices=i;pdf=p;}
 @GetMapping("/invoices/{id}/pdf") public ResponseEntity<byte[]> invoice(@PathVariable String id,Principal p)throws Exception{
  Invoice i=invoices.findByIdAndUserId(id,p.getName()).orElseThrow(()->new NoSuchElementException("Invoice not found"));
  return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename="+i.getInvoiceNumber()+".pdf").body(pdf.invoice(i));
 }
 @GetMapping("/reports/pdf") public ResponseEntity<byte[]> report(@RequestParam LocalDate from,@RequestParam LocalDate to,Principal p)throws Exception{
  if(to.isBefore(from))throw new IllegalArgumentException("'to' must be on or after 'from'");
  List<Invoice> list=invoices.findByUserIdOrderByCreatedAtDesc(p.getName()).stream().filter(i->!i.getIssueDate().isBefore(from)&&!i.getIssueDate().isAfter(to)).toList();
  return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=invoice-report.pdf").body(pdf.report(list,from.toString(),to.toString()));
 }
}
