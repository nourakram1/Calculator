package com.example.demo.Calculator;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
    int a;
    int b;
    int c;
    String d;
    public Double performOperation(Instruction instruction) {
        if (instruction.operand2() == null)
            return performUnaryOperation(instruction);
        return performBinaryOperation(instruction);
    }

    private Double performUnaryOperation(Instruction instruction) {
        return switch (instruction.operation()) {
            case SQUARE -> instruction.operand1() * instruction.operand1();
            case SQUARE_ROOT -> Math.sqrt(instruction.operand1());
            case RECIPROCAL -> 1 / instruction.operand1();
            case ADDITIVE_INVERSE -> -instruction.operand1();
            case CONVERT_TO_PERCENTAGE -> instruction.operand1() / 100;
            default -> throw new IllegalArgumentException("Unknown operation");
        };
    }

    private Double performBinaryOperation(Instruction instruction) {
        return switch (instruction.operation()) {
            case ADD -> instruction.operand1() + instruction.operand2();
            case SUB -> instruction.operand1() - instruction.operand2();
            case MULTIPLY -> instruction.operand1() * instruction.operand2();
            case DIVIDE -> instruction.operand1() / instruction.operand2();
            default -> throw new IllegalArgumentException("Unknown operation");
        };
    }
}
