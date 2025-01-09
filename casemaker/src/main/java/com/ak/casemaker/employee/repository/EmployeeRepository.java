package com.ak.casemaker.employee.repository;

import com.ak.casemaker.employee.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
