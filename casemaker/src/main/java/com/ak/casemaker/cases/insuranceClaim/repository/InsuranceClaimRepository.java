package com.ak.casemaker.cases.insuranceClaim.repository;

import com.ak.casemaker.cases.insuranceClaim.models.InsuranceClaim;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceClaimRepository extends JpaRepository<InsuranceClaim, Long> {
}
