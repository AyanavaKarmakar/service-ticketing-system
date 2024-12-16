package com.ak.casemaker.libs.utils;

import lombok.Getter;

@Getter
public enum Role {
    CUSTOMER("ROLE_CUSTOMER"),
    EMPLOYEE("ROLE_EMPLOYEE"),
    ADMIN("ROLE_ADMIN"),
    SUPERADMIN("ROLE_SUPERADMIN");

    private final String roleName;

    Role(String roleName) {
        this.roleName = roleName;
    }
}
