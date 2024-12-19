package com.ak.casemaker.customer.services;

import com.ak.casemaker.customer.models.Customer;

import java.util.List;

public interface CustomerServiceInterface {
    Customer getCustomer(Long id);
    List<Customer> getAllCustomers();
    void deleteCustomer(Long id);
}
