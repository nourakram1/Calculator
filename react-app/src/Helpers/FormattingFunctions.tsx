export function formatNumber(number: string): string {
  let sign = "";
  if (number.startsWith("-")) {
    sign = "-";
    number = number.slice(1); // slice(1) already works, so length is not necessary
  }
  if (isNaN(parseFloat(number))) return number;

  const [integerPart, decimalPart] = number.split(".");

  let formattedIntegerPart = "";
  for (let i = integerPart.length - 1; i >= 0; i--) {
    formattedIntegerPart = integerPart[i] + formattedIntegerPart;
    if ((integerPart.length - i) % 3 === 0 && i > 0) {
      formattedIntegerPart = "," + formattedIntegerPart;
    }
  }

  const formattedNumber = decimalPart !== undefined
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return sign + formattedNumber;
}


export function formatOperator(operation: string) {
  switch (operation) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "×";
    case "divide":
      return "÷";
    case "square":
    case "square_root":
    case "reciprocal":
    case "convert_to_percentage":
    case "additive_inverse":
    case "=":
      return "=";
    default:
      return "";
  }
}
