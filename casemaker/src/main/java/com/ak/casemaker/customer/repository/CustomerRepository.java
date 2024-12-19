package com.ak.casemaker.customer.repository;

import com.ak.casemaker.customer.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
