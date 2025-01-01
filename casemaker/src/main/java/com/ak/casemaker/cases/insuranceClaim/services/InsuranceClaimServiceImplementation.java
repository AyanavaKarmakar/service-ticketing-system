package com.ak.casemaker.cases.insuranceClaim.services;

import com.ak.casemaker.cases.insuranceClaim.models.InsuranceClaim;
import com.ak.casemaker.cases.insuranceClaim.repository.InsuranceClaimRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class InsuranceClaimServiceImplementation implements InsuranceClaimServiceInterface{
    @Autowired
    private InsuranceClaimRepository insuranceClaimRepository;
    private static final Logger LOGGER = LogManager.getLogger();

    @Override
    public InsuranceClaim getInsuranceClaim(Long id) {
        InsuranceClaim insuranceClaim = insuranceClaimRepository.findById(id).orElseThrow(() -> {
            String errorMessage = "Insurance Claim with id: " + id + ", doesn't not exist";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });

        LOGGER.info("Insurance Claim with id: {}, found", id);
        return insuranceClaim;
    }

    @Override
    public List<InsuranceClaim> getAllInsuranceClaims() {
            LOGGER.info("Returning list of all Insurance Claims");
            return insuranceClaimRepository.findAll();
    }

    @Override
    public void deleteInsuranceClaim(Long id) {
        InsuranceClaim insuranceClaim = insuranceClaimRepository.findById(id).orElseThrow(() -> {
            String errorMessage = "Insurance Claim with id: " + id + ", not found. Unable to delete Insurance Claim";
            LOGGER.error(errorMessage);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage);
        });
         insuranceClaimRepository.delete(insuranceClaim);
        LOGGER.info("Insurance Claim with id: {}, deleted successfully", id);
    }
}
