package com.ak.casemaker.libs.utils;

import lombok.Getter;

@Getter
public enum Role {
    CUSTOMER("CUSTOMER"),
    EMPLOYEE("EMPLOYEE"),
    ADMIN("ADMIN"),
    SUPERADMIN("SUPERADMIN");

    private final String roleName;

    Role(String roleName) {
        this.roleName = roleName;
    }
}
