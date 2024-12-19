package com.ak.casemaker.superadmin.controllers;

import com.ak.casemaker.libs.utils.CustomApiResponse;
import com.ak.casemaker.superadmin.models.SuperAdmin;
import com.ak.casemaker.superadmin.services.SuperAdminServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/super-admin")
@Tag(name = "Super Admin Management", description = "APIs for managing Super Admins")
public class SuperAdminController {
    @Autowired
    private SuperAdminServiceInterface superAdminService;

    @Operation(summary = "Get a Super Admin", description = "Fetch a Super Admin by their ID")
    @GetMapping("{id}")
    public ResponseEntity<CustomApiResponse<SuperAdmin>> getSuperAdmin(@PathVariable("id") Long id) {
        SuperAdmin superAdmin = superAdminService.getSuperAdmin(id);
        CustomApiResponse<SuperAdmin> customApiResponse = new CustomApiResponse<>(
                superAdmin,
                "Super Admin with id: " + id + ", found");
        return new ResponseEntity<>(customApiResponse, HttpStatus.FOUND);
    }

    @Operation(summary = "Get all Super Admins", description = "Fetch list of all Super Admins")
    @GetMapping("/all")
    public ResponseEntity<CustomApiResponse<List<SuperAdmin>>> getAllSuperAdmins() {
        List<SuperAdmin> superAdmins = superAdminService.getAllSuperAdmins();
        CustomApiResponse<List<SuperAdmin>> customApiResponse = new CustomApiResponse<>(
                superAdmins,
                "List of all Super Admins"
        );
        return new ResponseEntity<>(customApiResponse, HttpStatus.FOUND);
    }
}
