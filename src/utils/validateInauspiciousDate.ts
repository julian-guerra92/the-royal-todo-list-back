import { isPrime } from "./validatePrimeNumber";

export function validateInauspiciousDate(dateStr: string): boolean {
  if (typeof dateStr !== 'string') return false;

  const digits = dateStr.match(/\d/g);
  if (!digits || digits.length === 0) return false;

  const sum = digits.reduce((acc, digit) => acc + Number(digit), 0);

  return isPrime(sum);
}