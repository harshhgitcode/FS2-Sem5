package com.capstone.invoicebilling.repository;
import com.capstone.invoicebilling.model.Payment; import org.springframework.data.mongodb.repository.MongoRepository; import java.util.List;
public interface PaymentRepository extends MongoRepository<Payment,String>{ List<Payment> findByInvoiceIdAndUserIdOrderByPaymentDateDesc(String invoiceId,String userId); }