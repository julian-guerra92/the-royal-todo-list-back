export function isPalindrome(
  text: string,
  caseSensitive: boolean = false,
  ignoreSpaces: boolean = true,
): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  let processedText = text;

  if (!caseSensitive) {
    processedText = processedText.toLowerCase();
  }

  if (ignoreSpaces) {
    processedText = processedText.replace(/[^a-z0-9]/g, '');
  }

  if (processedText.length <= 1) {
    return false;
  }

  const reversed = processedText.split('').reverse().join('');
  return processedText === reversed;
}

export function isCursedTitle(title: string): boolean {
  return isPalindrome(title);
}


export const PALINDROME_EXAMPLES = {
  spanish: [
    'Anita lava la tina',
    'A mamá Roma le aviva el amor a papá y a papá Roma le aviva el amor a mamá',
    'Dábale arroz a la zorra el abad',
    'La ruta nos aportó otro paso natural',
    'Oso',
    'Ana',
    'Radar',
  ],
  english: [
    'A man a plan a canal Panama',
    'Race a car',
    'Was it a rat I saw',
    'Madam',
    'Level',
    'Noon',
  ],
  mixed: [
    'A Santa at NASA',
    'Mr Owl ate my metal worm',
    '12321',
    'Taco cat',
  ],
};