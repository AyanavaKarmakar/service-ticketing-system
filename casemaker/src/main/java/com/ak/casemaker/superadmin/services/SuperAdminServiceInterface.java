package com.ak.casemaker.superadmin.services;

import com.ak.casemaker.cases.insuranceClaim.models.InsuranceClaim;
import com.ak.casemaker.superadmin.models.SuperAdmin;

import java.util.List;

public interface SuperAdminServiceInterface {
    // CRUD
    SuperAdmin getSuperAdmin(Long id);
    List<SuperAdmin> getAllSuperAdmins();
    void deleteSuperAdmin(Long id);
    // iClaims: Customer
    InsuranceClaim assignInsuranceClaimToCustomer(long claimId, long customerId);
    InsuranceClaim removeInsuranceClaimFromCustomer(long claimId, long customerId);
    InsuranceClaim reAssignInsuranceClaimFromCustomer(long claimId, long oldCustomerId, long newCustomerId);
    // iClaims: Employee
    InsuranceClaim assignInsuranceClaimToEmployee(long claimId, long employeeId);
    InsuranceClaim removeInsuranceClaimFromEmployee(long claimId, long employeeId);
    InsuranceClaim reAssignInsuranceClaimFromEmployee(long claimId, long oldEmployeeId, long newEmployeeId);
}
