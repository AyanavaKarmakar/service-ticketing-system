package com.ak.casemaker.cases.insuranceClaim.models;

import com.ak.casemaker.customer.models.Customer;
import com.ak.casemaker.employee.models.Employee;
import com.ak.casemaker.libs.utils.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "insurance_claim")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceClaim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(name = "insurance_claim_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status = Status.OPEN;

    @NotNull
    @NotEmpty
    @ElementCollection
    @CollectionTable(name = "insurance_claim_issue_type", joinColumns = @JoinColumn(name = "insurance_claim_id"))
    @Column(name = "issue_type")
    private List<String> issueType;

    private String issueDescription;

    @Column(nullable = false, updatable = false)
    @NotNull
    private LocalDateTime createdOn;

    @Column(nullable = false)
    @NotNull
    private LocalDateTime lastUpdatedOn;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @PrePersist
    public void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdOn = now;
        this.lastUpdatedOn = now;
    }

    @PreUpdate
    public void onUpdate() {
        this.lastUpdatedOn = LocalDateTime.now();
    }
}
