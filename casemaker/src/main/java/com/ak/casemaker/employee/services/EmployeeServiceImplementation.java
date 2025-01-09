package com.ak.casemaker.employee.services;

import com.ak.casemaker.employee.models.Employee;
import com.ak.casemaker.employee.repository.EmployeeRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EmployeeServiceImplementation implements EmployeeServiceInterface{
    @Autowired
    EmployeeRepository employeeRepository;

    private static final Logger LOGGER = LogManager.getLogger();

    @Override
    public Employee getEmployee(long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> {
            String errorMessage = "Employee with id: " + id + ", not found";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        LOGGER.info("Employee with id: {}, found", id);
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
        LOGGER.info("Returning list of all employees");
        return employeeRepository.findAll();
    }

    @Override
    public void deleteEmployee(long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> {
            String errorMessage = "Employee with id: " + id + ", not found";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        employeeRepository.delete(employee);
        LOGGER.info("Employee with id: {}, deleted successfully", id);
    }
}
