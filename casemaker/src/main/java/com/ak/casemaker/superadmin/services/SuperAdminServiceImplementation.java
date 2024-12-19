package com.ak.casemaker.superadmin.services;

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
}
