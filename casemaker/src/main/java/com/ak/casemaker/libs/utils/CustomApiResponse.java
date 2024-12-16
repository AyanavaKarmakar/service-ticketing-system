package com.ak.casemaker.libs.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class CustomApiResponse<T> {
    @Getter
    @Setter
    private T data;
    @Getter
    @Setter
    private String message;
}
