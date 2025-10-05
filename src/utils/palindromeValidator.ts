/**
 * Utilidad para detectar palíndromos en títulos de notas
 * Implementa la lógica de la "Maldición del Palíndromo"
 */

/**
 * Verifica si una cadena de texto es un palíndromo
 * @param text - El texto a verificar
 * @param caseSensitive - Si debe ser sensible a mayúsculas/minúsculas (por defecto: false)
 * @param ignoreSpaces - Si debe ignorar espacios y caracteres especiales (por defecto: true)
 * @returns true si el texto es un palíndromo, false en caso contrario
 */
export function isPalindrome(
  text: string,
  caseSensitive: boolean = false,
  ignoreSpaces: boolean = true,
): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  let processedText = text;

  // Convertir a minúsculas si no es case sensitive
  if (!caseSensitive) {
    processedText = processedText.toLowerCase();
  }

  // Remover espacios y caracteres especiales si está habilitado
  if (ignoreSpaces) {
    // Mantener solo letras y números
    processedText = processedText.replace(/[^a-z0-9]/g, '');
  }

  // Un texto vacío o de un solo carácter no se considera palíndromo válido
  if (processedText.length <= 1) {
    return false;
  }

  // Verificar si es palíndromo comparando con su reverso
  const reversed = processedText.split('').reverse().join('');
  return processedText === reversed;
}

/**
 * Verifica si un título está bajo la "Maldición del Palíndromo"
 * Esta es la función principal que debe usar el TodosService
 * @param title - El título de la nota a verificar
 * @returns true si el título está maldito (es palíndromo), false en caso contrario
 */
export function isCursedTitle(title: string): boolean {
  return isPalindrome(title);
}

/**
 * Obtiene información detallada sobre por qué un título está maldito
 * Útil para mensajes informativos al usuario
 * @param title - El título a analizar
 * @returns Objeto con información de la maldición o null si no está maldito
 */
export function getCurseDetails(title: string) {
  if (!isCursedTitle(title)) {
    return null;
  }

  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  return {
    isCursed: true,
    originalTitle: title,
    processedTitle: cleanTitle,
    message: `🔮 ¡Maldición del Palíndromo detectada! El título "${title}" es un palíndromo.`,
    warningMessage: '⚠️ Esta nota será eliminada automáticamente en unos segundos...',
    length: cleanTitle.length,
  };
}

/**
 * Ejemplos de palíndromos para testing y demostración
 */
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

/**
 * Función de utilidad para testing - verifica múltiples ejemplos
 * @param examples - Array de strings para testear
 * @returns Resultado de las pruebas
 */
export function testPalindromes(examples: string[]) {
  return examples.map((example) => ({
    text: example,
    isPalindrome: isPalindrome(example),
    curseDetails: getCurseDetails(example),
  }));
}