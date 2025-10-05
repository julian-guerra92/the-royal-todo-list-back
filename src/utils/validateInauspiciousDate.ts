export function validateInauspiciousDate(dateStr: string): boolean {
  if (typeof dateStr !== 'string') return false;

  const digits = dateStr.match(/\d/g);
  if (!digits || digits.length === 0) return false;

  const sum = digits.reduce((acc, digit) => acc + Number(digit), 0);

  return isPrime(sum);
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}