const digits = "০১২৩৪৫৬৭৮৯";

// 1850 -> "১,৮৫০"
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => digits[Number(d)]);
}

// 1850 -> "১,৮৫০ টাকা"
export function formatPrice(n: number): string {
  return `${toBn(n.toLocaleString("en-US"))} টাকা`;
}

// "kg" -> "প্রতি কেজি"
const units: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};
export function unitLabel(unit: string): string {
  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

// { dir: "up", pct: 2.1 } -> "▲ ২.১%"
export function formatChange(dir: string, pct: number): string {
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return `${arrow} ${toBn(Math.abs(pct).toFixed(1))}%`;
}

// "kg" -> "কেজি"
export function unitShort(unit: string): string {
  return unitLabel(unit).replace("প্রতি ", "");
}
