package com.ak.casemaker.superadmin.services;

import com.ak.casemaker.cases.insuranceClaim.models.InsuranceClaim;
import com.ak.casemaker.cases.insuranceClaim.repository.InsuranceClaimRepository;
import com.ak.casemaker.customer.models.Customer;
import com.ak.casemaker.customer.repository.CustomerRepository;
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
        return null;
    }
}
