package com.ak.casemaker.customer.controllers;

import com.ak.casemaker.customer.models.Customer;
import com.ak.casemaker.customer.services.CustomerServiceInterface;
import com.ak.casemaker.libs.utils.ResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer")
@Tag(name = "Customer Management", description = "APIs for managing Customers")
public class CustomerController {
    @Autowired
    private CustomerServiceInterface customerService;

    @Operation(summary = "Get a Customer", description = "Fetch a Customer by their ID")
    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapper<Customer>> getCustomer(@PathVariable("id") Long id) {
        Customer customer = customerService.getCustomer(id);
        ResponseWrapper<Customer> responseWrapper = new ResponseWrapper<>(
                customer,
                "Customer with id: " + id + ", found");
        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
    }

    @Operation(summary = "Get all Customers", description = "Fetch list of all Customers")
    @GetMapping("/all")
    public ResponseEntity<ResponseWrapper<List<Customer>>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        ResponseWrapper<List<Customer>> responseWrapper = new ResponseWrapper<>(
                customers,
                "List of all Customers"
        );
        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
    }

    @Operation(summary = "Delete a Customer", description = "Delete a Customer by their ID")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCustomer(Long id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(
                "Customer with ID: " + id + ", has been delete successfully"
                , HttpStatus.OK
        );
    }
}
