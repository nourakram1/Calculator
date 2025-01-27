package com.example.demo.Calculator;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Operation {

    // 9 operations in total
    // 4 binary operation
    // 5 unary operation

    ADD("add"),
    SUB("subtract"),
    MULTIPLY("multiply"),
    DIVIDE("divide"),
    SQUARE("square"),
    SQUARE_ROOT("square_root"),
    RECIPROCAL("reciprocal"),
    ADDITIVE_INVERSE("additive_inverse"),
    CONVERT_TO_PERCENTAGE("convert_to_percentage");


    private String value;

    Operation(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
