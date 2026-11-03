package com.capstone.invoicebilling.service;
import com.capstone.invoicebilling.model.Invoice; import com.lowagie.text.*; import com.lowagie.text.pdf.*;
import org.springframework.stereotype.Service; import java.io.*; import java.time.format.DateTimeFormatter; import java.util.List;
@Service
public class PdfService {
 private void heading(Document d,String title)throws DocumentException{d.add(new Paragraph(title,new Font(Font.HELVETICA,20,Font.BOLD)));d.add(new Paragraph("Invoice & Billing Management"));d.add(new Paragraph(" "));}
 public byte[] invoice(Invoice i)throws Exception{
  ByteArrayOutputStream out=new ByteArrayOutputStream();Document d=new Document();PdfWriter.getInstance(d,out);d.open();heading(d,"INVOICE");
  d.add(new Paragraph("Invoice: "+i.getInvoiceNumber()));d.add(new Paragraph("Customer: "+i.getCustomerName()));d.add(new Paragraph("Issue date: "+i.getIssueDate()+"     Due date: "+i.getDueDate()));d.add(new Paragraph(" "));
  PdfPTable t=new PdfPTable(4);t.setWidthPercentage(100);for(String h:List.of("Description","Qty","Unit price","Amount"))t.addCell(new PdfPCell(new Phrase(h)));
  for(var x:i.getItems()){t.addCell(x.getDescription());t.addCell(x.getQuantity().toPlainString());t.addCell("INR "+x.getUnitPrice());t.addCell("INR "+x.getAmount());}d.add(t);
  d.add(new Paragraph("Subtotal: INR "+i.getSubtotal()));d.add(new Paragraph("Tax ("+i.getTaxRate()+"%): INR "+i.getTaxAmount()));d.add(new Paragraph("TOTAL: INR "+i.getTotal()));d.add(new Paragraph("Paid: INR "+i.getAmountPaid()+"     Balance: INR "+i.getBalance()));d.add(new Paragraph("Status: "+i.getStatus()));if(i.getNotes()!=null)d.add(new Paragraph("Notes: "+i.getNotes()));d.close();return out.toByteArray();
 }
 public byte[] report(List<Invoice> list,String from,String to)throws Exception{
  ByteArrayOutputStream out=new ByteArrayOutputStream();Document d=new Document();PdfWriter.getInstance(d,out);d.open();heading(d,"INVOICE SUMMARY REPORT");d.add(new Paragraph("Period: "+from+" to "+to));d.add(new Paragraph(" "));
  PdfPTable t=new PdfPTable(5);t.setWidthPercentage(100);for(String h:List.of("Invoice","Customer","Date","Total (INR)","Status"))t.addCell(h);
  for(var i:list){t.addCell(i.getInvoiceNumber());t.addCell(i.getCustomerName());t.addCell(String.valueOf(i.getIssueDate()));t.addCell(i.getTotal().toPlainString());t.addCell(i.getStatus());}d.add(t);d.close();return out.toByteArray();
 }
}
