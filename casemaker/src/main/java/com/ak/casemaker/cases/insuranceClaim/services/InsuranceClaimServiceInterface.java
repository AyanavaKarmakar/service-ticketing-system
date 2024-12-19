package com.ak.casemaker.cases.insuranceClaim.services;

import com.ak.casemaker.cases.insuranceClaim.models.InsuranceClaim;

import java.util.List;

public interface InsuranceClaimServiceInterface {
    InsuranceClaim getInsuranceClaim(Long id);
    List<InsuranceClaim> getAllInsuranceClaims();
    void deleteInsuranceClaim(Long id);
}
