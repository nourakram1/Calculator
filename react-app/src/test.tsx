



import { useEffect, useState } from "react";
import { formatNumber, formatOperator } from "./Helpers/FormattingFunctions";
import {
  BINARY_OPERATIONS,
  UNARY_OPERATIONS,
  UnaryOperation,
} from "./Helpers/Constants";
import { calculateBinary, calculateUnary } from "./fetchers";


export default function App2() {
  const [previousOperand, setPreviousOperand] = useState<string>("");
  const [currentOperand, setCurrentOperand] = useState<string>("0");
  const [operation, setOperation] = useState<string>("");
  
  const [dummyOperand, setDummyOperand] = useState(false);
  const [instruction, setInstruction] = useState<string>("");
  const [temp, setTemp] = useState<string>("");

  const [currOpFontSize, setCurrOpFontSize] = useState<string>("5rem");
  
  function addDigit(digit: string) {
    if(isNaN(parseFloat(currentOperand)))
    {
      setCurrentOperand(digit === "." ? "0." : digit)
      setOperation("");
      setPreviousOperand("");
      setInstruction("");
      return;
    }
    if(instruction !== "") {
      setCurrentOperand(digit === "." ? "0." : digit)
      setOperation("");
      setPreviousOperand("");
      setInstruction("");
      return;
    }
    if(dummyOperand) {
      setCurrentOperand(digit === "." ? "0." : digit)
      setDummyOperand(false);
      return;
    }

    setPreviousOperand(isNaN(parseFloat(previousOperand)) ? "" : previousOperand);
    if ((digit === "." && currentOperand.includes(".")) || currentOperand.length === 15)return;
    setCurrentOperand(currentOperand === "0" && digit !== "."? digit: `${currentOperand}${digit}`);
  }

  async function chooseUnaryOperation(op: UnaryOperation)
  {
    if(isNaN(parseFloat(currentOperand))) return;
    if(instruction === "")
    {
      const answer = await calculateUnary(op, currentOperand)
      setCurrentOperand(answer);
    }
    if(instruction !== "")
    {
      const answer = await calculateUnary(op, currentOperand)
      setCurrentOperand(answer);
      setInstruction("");
      setTemp("");
      setOperation("");
      setPreviousOperand("");
    }
  }

  function chooseBinaryOPeration(op: string){
    if(isNaN(parseFloat(currentOperand))) return;
    if(instruction === "")
    {
      setPreviousOperand(currentOperand);
      setOperation(op);
      setDummyOperand(true);
      return;
    }
    if(instruction !== "")
    {
      setInstruction("");
      setTemp("");
      setPreviousOperand(currentOperand);
      setOperation(op);
      setDummyOperand(true);
      return;
    }
  }

  async function evaluate() { // 4 cases (copy equal 2 cases, first equal, concurrent equal)
    //case of copy equal
    if(isNaN(parseFloat(currentOperand))) return;
    if(operation == "" && previousOperand == "")
    {
      setOperation("=");
      setPreviousOperand(currentOperand);
      setDummyOperand(true);
      return;
    }
    if(operation == "=")
    {
      setPreviousOperand(currentOperand);
      setDummyOperand(true);
      return;
    }
    // case of operation
    if(instruction === "")
    {
      setTemp(currentOperand);
      const answer = await calculateBinary(operation, previousOperand, currentOperand);
      setInstruction(`${formatNumber(previousOperand)} ${formatOperator(operation)} ${formatNumber(currentOperand)} =`);
      setCurrentOperand(answer);
      return;
    }
    if(instruction !== "")
    {
      const answer = await calculateBinary(operation, currentOperand, temp);
      setInstruction(`${formatNumber(currentOperand)} ${formatOperator(operation)} ${formatNumber(temp)} =`);
      setPreviousOperand(currentOperand);
      setCurrentOperand(answer);
      return;
    }
  }
  
  /////////////////////////////////////////////////////
  function C_clear()
  {
    setCurrentOperand("0");
    setPreviousOperand("");
    setOperation("");
    setDummyOperand(false);
    setInstruction("");
    setTemp("");
  }
  function CE_clear()
  {
    if(instruction !== "")
      C_clear();
      
    else
      setCurrentOperand("0");
  }
  function deleteDigit()
  {
    if(isNaN(parseFloat(currentOperand)))
      {
        C_clear();
        return;
      }
    if(instruction !== ""){
      setInstruction("");
      setTemp("");
      setPreviousOperand("");
      setOperation("");
    }
    else{
      setCurrentOperand(currentOperand.slice(0, -1) || "0");
    }
  }
  /////////////////////////////////////////////////////
  function truncateTo15Chars(numStr: string): string {
    const num = Number(numStr);
    if (isNaN(num)) {
        return "Invalid number";
    }

    // Convert to scientific notation
    let [significand, exponent] = num.toExponential().split("e");
    exponent = exponent ? `e${exponent}` : ""; // Reattach the "e" to the exponent part

    // Calculate remaining space for the significand
    const maxSignificandLength = 15 - exponent.length;

    // Truncate the significand to fit within the max allowed length
    significand = significand.slice(0, maxSignificandLength);

    // Combine and return the result
    return `${significand}${exponent}`;
}
  useEffect(() => {
    console.log("previousOperand = ", previousOperand);
  }, [previousOperand]);
  useEffect(() => {
    console.log("currentOperand = ", currentOperand);
    console.log(currentOperand.length);
    if(!isNaN(parseFloat(currentOperand)))
    {
      if(currentOperand.length > 15)
      setCurrentOperand(truncateTo15Chars(currentOperand));
    }
    else{
      setOperation("");
      setPreviousOperand("");
    }
    if (currentOperand && currentOperand.length > 20) {
      setCurrOpFontSize("2.8rem"); // Reduce for very long strings
    } else if (currentOperand && currentOperand.length > 12) {
      setCurrOpFontSize("3.2rem");
    } else if (currentOperand && currentOperand.length > 9) {
      setCurrOpFontSize("4rem");
    } else {
      setCurrOpFontSize("5rem");
    }
  }, [currentOperand]);
  useEffect(() => {
    console.log("operation = ", operation);
  }, [operation]);
  useEffect(() => {
    console.log("dummyOperand = ", dummyOperand);
  }, [dummyOperand]);
  useEffect(() => {
    console.log("dummyOperand = ", instruction);
  }, [instruction]);
  /////////////////////////////////////////////////////

  return (
    <>
      <div className="container">
        <div className="display">
          <div className="previous-operand">
            {instruction == "" ?  ((!isNaN(parseFloat(previousOperand)) ? formatNumber(previousOperand) : previousOperand) + " " + formatOperator(operation)) : instruction}
          </div>
          <div className="current-operand" style={{ fontSize: currOpFontSize }}>
            {!isNaN(parseFloat(currentOperand)) ? formatNumber(currentOperand) : currentOperand}
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => chooseUnaryOperation(UNARY_OPERATIONS.CONVERT_TO_PERCENTAGE)} className="item item-grey">%</button>
          <button onClick={CE_clear} className="item item-grey">CE</button>
          <button onClick={C_clear} className="item item-grey">C</button>
          <button onClick={deleteDigit} className="item item-orange">⌫</button>

          <button onClick={() => chooseUnaryOperation(UNARY_OPERATIONS.RECIPROCAL)} className="item item-grey">⅟𝑥</button>
          <button onClick={() => chooseUnaryOperation(UNARY_OPERATIONS.SQUARE)} className="item item-grey">𝑥²</button>
          <button onClick={() => chooseUnaryOperation(UNARY_OPERATIONS.SQUARE_ROOT)} className="item item-grey">√𝑥</button>
          <button onClick={() => chooseBinaryOPeration(BINARY_OPERATIONS.DIVIDE)}className="item item-orange">÷</button>

          <button onClick={() => addDigit("7")} className="item item-darkgrey">7</button>
          <button onClick={() => addDigit("8")} className="item item-darkgrey">8</button>
          <button onClick={() => addDigit("9")} className="item item-darkgrey">9</button>
          <button onClick={() => chooseBinaryOPeration(BINARY_OPERATIONS.MULTIPLY)} className="item item-orange">×</button>

          <button onClick={() => addDigit("4")} className="item item-darkgrey">4</button>
          <button onClick={() => addDigit("5")} className="item item-darkgrey">5</button>
          <button onClick={() => addDigit("6")} className="item item-darkgrey">6</button>
          <button onClick={() => chooseBinaryOPeration(BINARY_OPERATIONS.SUB)} className="item item-orange">-</button>

          <button onClick={() => addDigit("1")} className="item item-darkgrey">1</button>
          <button onClick={() => addDigit("2")} className="item item-darkgrey">2</button>
          <button onClick={() => addDigit("3")} className="item item-darkgrey">3</button>
          <button onClick={() => chooseBinaryOPeration(BINARY_OPERATIONS.ADD)} className="item item-orange">+</button>

          <button onClick={() => chooseUnaryOperation(UNARY_OPERATIONS.ADDITIVE_INVERSE)} className="item item-darkgrey">±</button>
          <button onClick={() => addDigit("0")} className="item item-darkgrey">0</button>
          <button onClick={() => addDigit(".")} className="item item-darkgrey">.</button>
          <button onClick={() =>evaluate()} className="item item-orange">=</button>
        </div>
      </div>
    </>
  );
}
