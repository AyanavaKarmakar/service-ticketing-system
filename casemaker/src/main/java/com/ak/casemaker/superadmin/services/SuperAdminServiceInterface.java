package com.ak.casemaker.superadmin.services;

import com.ak.casemaker.superadmin.models.SuperAdmin;

import java.util.List;

public interface SuperAdminServiceInterface {
    SuperAdmin getSuperAdmin(Long id);
    List<SuperAdmin> getAllSuperAdmins();
    void deleteSuperAdmin(Long id);
}
