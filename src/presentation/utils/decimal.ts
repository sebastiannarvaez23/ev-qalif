export function sanitizeDecimal(raw: string): string {
  let v = raw.replace(/,/g, ".").replace(/[^\d.]/g, "");
  const firstDot = v.indexOf(".");
  if (firstDot !== -1) {
    v = v.slice(0, firstDot + 1) + v.slice(firstDot + 1).replace(/\./g, "");
  }
  return v;
}

export function isCompleteDecimal(value: string): boolean {
  if (value.trim() === "") return false;
  if (value === "." || value.endsWith(".")) return false;
  return !Number.isNaN(Number(value));
}

export function toNumber(value: string): number {
  return Number(sanitizeDecimal(value));
}

export function formatGrade(value: number): string {
  return value.toFixed(2);
}
