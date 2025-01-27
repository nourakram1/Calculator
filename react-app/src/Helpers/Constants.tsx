export const BINARY_OPERATIONS = {
  ADD: "add",
  SUB: "subtract",
  MULTIPLY: "multiply",
  DIVIDE: "divide",
} as const;

export const UNARY_OPERATIONS = {
  SQUARE: "square",
  SQUARE_ROOT: "square_root",
  RECIPROCAL: "reciprocal",
  ADDITIVE_INVERSE: "additive_inverse",
  CONVERT_TO_PERCENTAGE: "convert_to_percentage",
} as const;

export type BinaryOperation =
  (typeof BINARY_OPERATIONS)[keyof typeof BINARY_OPERATIONS];
export type UnaryOperation =
  (typeof UNARY_OPERATIONS)[keyof typeof UNARY_OPERATIONS];
