import { evaluate } from "mathjs";

export function validateFormula(formula = [], nuCasaDecimal = 2) {
  const expr = formula.map(item => item.toString().replace(",", "."));

  try {
    const result = evaluate(expr.join("")).toFixed(nuCasaDecimal);

    if (isNaN(result)) {
      throw new Error("Fórmula ou valores inválidos!");
    }
    return result;
  } catch (err) {
    return "Fórmula ou valores inválidos!";
  }
}

export function validateTotal(total, row, totalExpr, nuCasaDecimal = 2) {
  const totalNumber = parseFloat(totalExpr);
  const num =
    typeof total === "string" ? parseFloat(total.replace(",", ".")) : total;

  if (isInteger(totalNumber) || isFloat(totalNumber)) {
    if (num && num.length >= row) {
      return total.map((item, index) =>
        index === row - 1 ? totalNumber : item
      );
    }
    return totalNumber;
  }
  return null;
}

export function isInteger(x) {
  return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
}

export function isFloat(x) {
  return !!(x % 1);
}

export function formatNumberCell(value, nuCasaDecimal) {
  if (value !== null) {
    const num = typeof value === "number" ? value.toString() : value;
    const result = parseFloat(num.replace(",", "."))
      .toFixed(nuCasaDecimal)
      .replace(".", ",");
    return result !== "NaN" ? result : "Fórmula ou valores inválidos!";
  }

  return "0";
}
