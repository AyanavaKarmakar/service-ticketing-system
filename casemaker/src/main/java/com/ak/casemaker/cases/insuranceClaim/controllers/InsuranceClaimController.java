package com.ak.casemaker.cases.insuranceClaim.controllers;

import com.ak.casemaker.cases.insuranceClaim.models.InsuranceClaim;
import com.ak.casemaker.cases.insuranceClaim.services.InsuranceClaimServiceInterface;
import com.ak.casemaker.libs.utils.ResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/insurance-claim")
@Tag(name = "Insurance Claim Management", description = "APIs for managing Insurance Claims")
public class InsuranceClaimController {
    @Autowired
    private InsuranceClaimServiceInterface insuranceClaimService;

    @Operation(summary = "Get an Insurance Claim", description = "Fetch an Insurance Claim by their ID")
    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapper<InsuranceClaim>> getInsuranceClaim(@PathVariable("id") Long id) {
        InsuranceClaim insuranceClaim = insuranceClaimService.getInsuranceClaim(id);
        ResponseWrapper<InsuranceClaim> responseWrapper = new ResponseWrapper<>(
                insuranceClaim,
                "Insurance Claim with id: " + id + ", found"
        );
        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
    }

    @Operation(summary = "Get all Insurance Claims", description = "Fetch all Insurance Claims")
    @GetMapping("/all")
    public ResponseEntity<ResponseWrapper<List<InsuranceClaim>>> getAllInsuranceClaims() {
        List<InsuranceClaim> insuranceClaims = insuranceClaimService.getAllInsuranceClaims();
        ResponseWrapper<List<InsuranceClaim>> responseWrapper = new ResponseWrapper<>(
                insuranceClaims,
                "List of all Insurance Claims"
        );
        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
    }

    @Operation(summary = "Delete an Insurance Claim", description = "Delete an Insurance Claim by their ID")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteInsuranceClaim(@PathVariable("id") Long id) {
        insuranceClaimService.deleteInsuranceClaim(id);
        return new ResponseEntity<>(
                "Insurance Claim with ID: " + id + ", has been delete successfully",
                HttpStatus.OK
        );
    }
}
