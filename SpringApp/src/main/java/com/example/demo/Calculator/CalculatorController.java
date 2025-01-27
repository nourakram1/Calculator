package com.example.demo.Calculator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CalculatorController {

    private final CalculatorService calculatorService;

    @Autowired
    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Double>> doOperation(@RequestBody Instruction instruction) {
        double result = calculatorService.performOperation(instruction);
        Map<String, Double> response = new HashMap<>();
        response.put("result", result);
        return ResponseEntity.ok(response);
    }
}
