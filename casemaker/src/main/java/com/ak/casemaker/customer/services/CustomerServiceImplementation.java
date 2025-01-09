package com.ak.casemaker.customer.services;

import com.ak.casemaker.customer.models.Customer;
import com.ak.casemaker.customer.repository.CustomerRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CustomerServiceImplementation implements CustomerServiceInterface {
    @Autowired
    private CustomerRepository customerRepository;

    private static final Logger LOGGER = LogManager.getLogger();

    @Override
    public Customer getCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> {
            String errorMessage = "Customer with id: " + id + ", not found";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        LOGGER.info("Customer with id: {}, found", id);
        return customer;
    }

    @Override
    public List<Customer> getAllCustomers() {
        LOGGER.info("returning list of all Customers");
        return customerRepository.findAll();
    }

    @Override
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> {
            String errorMessage = "Customer with id: " + id + ", not found";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        customerRepository.delete(customer);
        LOGGER.info("Customer with id: {}, deleted successfully", id);
    }
}
