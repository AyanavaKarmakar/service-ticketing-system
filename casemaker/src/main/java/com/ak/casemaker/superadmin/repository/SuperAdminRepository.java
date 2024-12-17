package com.ak.casemaker.superadmin.repository;

import com.ak.casemaker.superadmin.models.SuperAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuperAdminRepository extends JpaRepository<SuperAdmin, Long> {
}
