package com.ak.casemaker.superadmin.services;

import com.ak.casemaker.cases.insuranceClaim.models.InsuranceClaim;
import com.ak.casemaker.cases.insuranceClaim.repository.InsuranceClaimRepository;
import com.ak.casemaker.customer.models.Customer;
import com.ak.casemaker.customer.repository.CustomerRepository;
import com.ak.casemaker.employee.models.Employee;
import com.ak.casemaker.employee.repository.EmployeeRepository;
import com.ak.casemaker.superadmin.models.SuperAdmin;
import com.ak.casemaker.superadmin.repository.SuperAdminRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SuperAdminServiceImplementation implements SuperAdminServiceInterface {
    @Autowired
    private SuperAdminRepository superAdminRepository;
    @Autowired
    private InsuranceClaimRepository insuranceClaimRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    private static final Logger LOGGER = LogManager.getLogger();

    @Override
    public SuperAdmin getSuperAdmin(Long id) {
        SuperAdmin superAdmin = superAdminRepository.findById(id).orElseThrow(() -> {
            String errorMessage = "Super Admin with id: " + id + ", not found";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        LOGGER.info("Super Admin with id: {}, found", id);
        return superAdmin;
    }

    @Override
    public List<SuperAdmin> getAllSuperAdmins() {
        LOGGER.info("Returning list of all Super Admins");
        return superAdminRepository.findAll();
    }

    @Override
    public void deleteSuperAdmin(Long id) {
        SuperAdmin superAdmin = superAdminRepository.findById(id).orElseThrow(() -> {
            String errorMessage = "Super Admin with id: " + id + ", not found. Unable to delete Super Admin";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        superAdminRepository.delete(superAdmin);
        LOGGER.info("Super Admin with id: {}, deleted successfully", id);
    }

    @Override
    public InsuranceClaim assignInsuranceClaimToCustomer(long claimId, long customerId) {
        InsuranceClaim insuranceClaim = insuranceClaimRepository.findById(claimId).orElseThrow(() -> {
            String errorMessage = "Insurance Claim with id: " + claimId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        if (insuranceClaim.getCustomer() != null) {
            String errorMessage = "Insurance Claim with id: " + claimId + " is already assigned to Customer with id: " + insuranceClaim.getCustomer().getId();
            LOGGER.error(errorMessage);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> {
            String errorMessage = "Customer with id: " + customerId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        customer.getInsuranceClaims().add(insuranceClaim);
        insuranceClaim.setCustomer(customer);
        customerRepository.save(customer);
        insuranceClaimRepository.save(insuranceClaim);

        LOGGER.info("Insurance Claim with id: {} assigned to Customer with id: {}", claimId, customerId);
        return insuranceClaim;
    }

    @Override
    public InsuranceClaim removeInsuranceClaimFromCustomer(long claimId, long customerId) {
        InsuranceClaim insuranceClaim = insuranceClaimRepository.findById(claimId).orElseThrow(() -> {
            String errorMessage = "Insurance Claim with id: " + claimId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        if (insuranceClaim.getCustomer() == null) {
            String errorMessage = "Insurance Claim with id: " + claimId + " is NOT assigned to any Customer";
            LOGGER.error(errorMessage);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> {
            String errorMessage = "Customer with id: " + customerId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        customer.getInsuranceClaims().remove(insuranceClaim);
        insuranceClaim.setCustomer(null);
        customerRepository.save(customer);
        insuranceClaimRepository.save(insuranceClaim);

        LOGGER.info("Insurance Claim with id: {} de-assigned from Customer with id: {}", claimId, customerId);
        return insuranceClaim;
    }

    @Override
    public InsuranceClaim reAssignInsuranceClaimFromCustomer(long claimId, long oldCustomerId, long newCustomerId) {
        InsuranceClaim insuranceClaim = insuranceClaimRepository.findById(claimId).orElseThrow(() -> {
            String errorMessage = "Insurance Claim with id: " + claimId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        if (insuranceClaim.getCustomer() == null) {
            String errorMessage = "Insurance Claim with id: " + claimId + " is NOT assigned to any Customer";
            LOGGER.error(errorMessage);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Customer oldCustomer = customerRepository.findById(oldCustomerId).orElseThrow(() -> {
            String errorMessage = "Old Customer with id: " + oldCustomerId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        Customer newCustomer = customerRepository.findById(newCustomerId).orElseThrow(() -> {
            String errorMessage = "New Customer with id: " + newCustomerId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        if (insuranceClaim.getCustomer() != oldCustomer) {
            String errorMessage = "Insurance Claim with id: " + claimId + " is NOT assigned to old Customer";
            LOGGER.error(errorMessage);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        oldCustomer.getInsuranceClaims().remove(insuranceClaim);
        insuranceClaim.setCustomer(newCustomer);
        insuranceClaimRepository.save(insuranceClaim);
        customerRepository.save(oldCustomer);
        customerRepository.save(newCustomer);

        LOGGER.info(
                "Insurance Claim with id: {} de-assigned from old Customer with id: {} & assigned to new Customer with id: {}",
                claimId, oldCustomerId, newCustomerId
        );
        return insuranceClaim;
    }

    @Override
    public InsuranceClaim assignInsuranceClaimToEmployee(long claimId, long employeeId) {
        InsuranceClaim insuranceClaim = insuranceClaimRepository.findById(claimId).orElseThrow(() -> {
            String errorMessage = "Insurance Claim with id: " + claimId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        if (insuranceClaim.getEmployee() != null) {
            String errorMessage = "Insurance Claim with id: " + claimId + " is already assigned to Employee with id: " + insuranceClaim.getCustomer().getId();
            LOGGER.error(errorMessage);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> {
            String errorMessage = "Employee with id: " + employeeId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        employee.getInsuranceClaims().add(insuranceClaim);
        insuranceClaim.setEmployee(employee);
        employeeRepository.save(employee);
        insuranceClaimRepository.save(insuranceClaim);

        LOGGER.info("Insurance Claim with id: {} assigned to Employee with id: {}", claimId, employeeId);
        return insuranceClaim;
    }

    @Override
    public InsuranceClaim removeInsuranceClaimFromEmployee(long claimId, long employeeId) {
        InsuranceClaim insuranceClaim = insuranceClaimRepository.findById(claimId).orElseThrow(() -> {
            String errorMessage = "Insurance Claim with id: " + claimId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        if (insuranceClaim.getEmployee() == null) {
            String errorMessage = "Insurance Claim with id: " + claimId + " is NOT assigned to any Employee";
            LOGGER.error(errorMessage);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> {
            String errorMessage = "Employee with id: " + employeeId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        employee.getInsuranceClaims().remove(insuranceClaim);
        insuranceClaim.setEmployee(null);
        employeeRepository.save(employee);
        insuranceClaimRepository.save(insuranceClaim);

        LOGGER.info("Insurance Claim with id: {} de-assigned from Employee with id: {}", claimId, employeeId);
        return insuranceClaim;
    }

    @Override
    public InsuranceClaim reAssignInsuranceClaimFromEmployee(long claimId, long oldEmployeeId, long newEmployeeId) {
        InsuranceClaim insuranceClaim = insuranceClaimRepository.findById(claimId).orElseThrow(() -> {
            String errorMessage = "Insurance Claim with id: " + claimId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        if (insuranceClaim.getEmployee() == null) {
            String errorMessage = "Insurance Claim with id: " + claimId + " is NOT assigned to any employee";
            LOGGER.error(errorMessage);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Employee oldEmployee = employeeRepository.findById(oldEmployeeId).orElseThrow(() -> {
            String errorMessage = "Old Employee with id: " + oldEmployeeId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        });

        Employee newEmployee = employeeRepository.findById(newEmployeeId).orElseThrow(() -> {
            String errorMessage = "New Employee with id: " + newEmployeeId + " not found.";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        });

        if (insuranceClaim.getEmployee() != oldEmployee) {
            String errorMessage = "Insurance Claim with id: " + claimId + " is NOT assigned to old Employee";
            LOGGER.error(errorMessage);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        oldEmployee.getInsuranceClaims().remove(insuranceClaim);
        insuranceClaim.setEmployee(newEmployee);
        insuranceClaimRepository.save(insuranceClaim);
        employeeRepository.save(oldEmployee);
        employeeRepository.save(newEmployee);

        LOGGER.info(
                "Insurance Claim with id: {} de-assigned from old Customer with id: {} & assigned to new Customer with id: {}",
                claimId, oldEmployeeId, newEmployeeId
        );
        return insuranceClaim;
    }
}
