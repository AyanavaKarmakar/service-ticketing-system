package com.ak.casemaker.employee.controllers;

import com.ak.casemaker.employee.models.Employee;
import com.ak.casemaker.employee.services.EmployeeServiceInterface;
import com.ak.casemaker.libs.utils.ResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employee")
@Tag(name = "Employee Management", description = "APIs for managing Employees")
public class EmployeeController {
    @Autowired
    private EmployeeServiceInterface employeeService;

    @Operation(summary = "Get an Employee", description = "Fetch an Employee by their ID")
    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapper<Employee>> getEmployee(@PathVariable("id") Long id) {
        Employee employee = employeeService.getEmployee(id);
        ResponseWrapper<Employee> responseWrapper = new ResponseWrapper<>(
                employee,
                "Employee with id: " + id + ", found"
        );
        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
    }

    @Operation(summary = "Get all Employees", description = "Fetch all Employees list")
    @GetMapping("/all")
    public ResponseEntity<ResponseWrapper<List<Employee>>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        ResponseWrapper<List<Employee>> responseWrapper = new ResponseWrapper<>(
                employees,
                "List of al Employees"
        );
        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
    }

    @Operation(summary = "Delete an Employee", description = "Delete an Employee by their id")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(
                "Employee with ID: " + id + ", has been delete successfully",
                HttpStatus.OK
        );
    }
}
