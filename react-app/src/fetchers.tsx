import axios from "axios";
import { BinaryOperation, UNARY_OPERATIONS, UnaryOperation } from "./Helpers/Constants";

export async function calculateUnary(operation:UnaryOperation, operand1:string) {
    const op1 = parseFloat(operand1);
    
    if (isNaN(op1)) {
        console.log("Error: operand is not a number");
        return "operand is not number";
    }
    
    try {
        console.log("____________________");
        console.log(op1, operation);
        console.log("____________________");
        const response = await axios.post("http://localhost:8080/calculate", {
            "operation": operation,
            "operand1": op1,
            "operand2": null
        });
        
        console.log("API Response:", response);  // Log the whole response
        console.log("OPERATION DONE, ans: ", response.data.result); // Log the result
        
        if(response.data.result.toString() === "NaN") return "Invalid input";
        if(response.data.result.toString() === "Infinity")
        {
            if(operation === UNARY_OPERATIONS.RECIPROCAL)
                return "Cannot divide by zero";
            else
                return "Overflow";
        }
        return response.data.result !== undefined ? response.data.result.toString() : 'Error';
    } catch (error) {
        console.error('Error fetching calculation:', error);
        return 'Error';
    }
}

export async function calculateBinary(operation: string, operand1: string, operand2: string): Promise<string> {
const op1 = parseFloat(operand1);
const op2 = parseFloat(operand2);

if (isNaN(op1) || isNaN(op2)) {
    console.log("Error: operands are not numbers");
    return "Operands are not numbers";
}

try {
    console.log("____________________");
    console.log(op1, operation, op2);
    console.log("____________________");
    
    const response = await axios.post("http://localhost:8080/calculate", {
        operation: operation,
        operand1: op1,
        operand2: op2
    });
    
    console.log("API Response:", response);  // Log the whole response
    console.log("OPERATION DONE, ans: ", response.data.result); // Log the result
    
    if(response.data.result.toString() === "NaN") return "Invalid input";
    if(response.data.result.toString() === "Infinity") {
        if(operation === "divide")
            return "Cannot divide by zero";
        else
            return "Overflow";
    }

    return response.data.result !== undefined ? response.data.result.toString() : 'Error';
} catch (error) {
    console.error('Error fetching calculation:', error);
    return 'Error';
}
}