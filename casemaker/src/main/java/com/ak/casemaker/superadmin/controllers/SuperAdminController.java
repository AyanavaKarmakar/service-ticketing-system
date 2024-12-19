package com.ak.casemaker.superadmin.controllers;

import com.ak.casemaker.libs.utils.ResponseWrapper;
import com.ak.casemaker.superadmin.models.SuperAdmin;
import com.ak.casemaker.superadmin.services.SuperAdminServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/super-admin")
@Tag(name = "Super Admin Management", description = "APIs for managing Super Admins")
public class SuperAdminController {
    @Autowired
    private SuperAdminServiceInterface superAdminService;

    @Operation(summary = "Get a Super Admin", description = "Fetch a Super Admin by their ID")
    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapper<SuperAdmin>> getSuperAdmin(@PathVariable("id") Long id) {
        SuperAdmin superAdmin = superAdminService.getSuperAdmin(id);
        ResponseWrapper<SuperAdmin> responseWrapper = new ResponseWrapper<>(
                superAdmin,
                "Super Admin with id: " + id + ", found");
        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
    }

    @Operation(summary = "Get all Super Admins", description = "Fetch list of all Super Admins")
    @GetMapping("/all")
    public ResponseEntity<ResponseWrapper<List<SuperAdmin>>> getAllSuperAdmins() {
        List<SuperAdmin> superAdmins = superAdminService.getAllSuperAdmins();
        ResponseWrapper<List<SuperAdmin>> responseWrapper = new ResponseWrapper<>(
                superAdmins,
                "List of all Super Admins"
        );
        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
    }

    @Operation(summary = "Delete a Super Admin", description = "Delete a Super Admin by their ID")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSuperAdmin(Long id) {
        superAdminService.deleteSuperAdmin(id);
        return new ResponseEntity<>(
                "Super Admin with ID: " + id + ", has been deleted successfully",
                HttpStatus.OK
        );
    }
}
