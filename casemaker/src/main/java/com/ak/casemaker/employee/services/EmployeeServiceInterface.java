package com.ak.casemaker.employee.services;

import com.ak.casemaker.employee.models.Employee;

import java.util.List;

public interface EmployeeServiceInterface {
    Employee getEmployee(long id);
    List<Employee> getAllEmployees();
    void deleteEmployee(long id);
}
