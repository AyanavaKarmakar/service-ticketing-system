package com.ak.casemaker.libs.utils;

import lombok.Getter;

@Getter
public enum Status {
    OPEN("OPEN"),
    IN_PROGRESS("IN_PROGRESS"),
    ON_HOLD("ON_HOLD"),
    COMPLETED("COMPLETED");

    private final String status;

    Status(String status) {
        this.status = status;
    }
}
