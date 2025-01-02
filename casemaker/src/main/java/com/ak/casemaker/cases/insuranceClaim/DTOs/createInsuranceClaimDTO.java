package com.ak.casemaker.cases.insuranceClaim.DTOs;

import com.ak.casemaker.libs.utils.Status;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class createInsuranceClaimDTO {
    @NotNull
    @NotEmpty
    private List<String> issueType;

    private String issueDescription;

    private Status status = Status.OPEN;
}
