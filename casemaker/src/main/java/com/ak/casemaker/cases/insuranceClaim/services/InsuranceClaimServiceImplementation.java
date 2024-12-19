package com.ak.casemaker.cases.insuranceClaim.services;

import com.ak.casemaker.cases.insuranceClaim.models.InsuranceClaim;
import com.ak.casemaker.cases.insuranceClaim.repository.InsuranceClaimRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsuranceClaimServiceImplementation implements InsuranceClaimServiceInterface{
    @Autowired
    private InsuranceClaimRepository insuranceClaimRepository;
    private static final Logger LOGGER = LogManager.getLogger();

    @Override
    public InsuranceClaim getInsuranceClaim(Long id) {
        return null;
    }

    @Override
    public List<InsuranceClaim> getAllInsuranceClaims() {
        return List.of();
    }

    @Override
    public void deleteInsuranceClaim(Long id) {

    }
}
