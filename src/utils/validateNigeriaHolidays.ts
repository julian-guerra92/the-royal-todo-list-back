const nigeriaPublicHolidays = new Map<string, string>([
  ['01-01', 'Día de Año Nuevo'],
  ['03-30', 'Eid El-Fitr'],
  ['03-31', 'Fiesta del Eid al-Fitr'],
  ['04-01', 'Fiesta del Eid al-Fitr'],
  ['04-18', 'Viernes Santo'],
  ['04-21', 'Lunes de Pascua'],
  ['05-01', 'Día de los trabajadores'],
  ['06-06', 'Id el Kabir'],
  ['06-09', 'Vacaciones adicionales de Id el Kabir'],
  ['06-12', 'Día de la Democracia'],
  ['07-15', 'Día de luto por el presidente Muhammadu Buhari'],
  ['09-05', 'Id el Maulud'],
  ['10-01', 'Día Nacional'],
  ['12-25', 'Día de Navidad'],
  ['12-26', 'Día de San Esteban'],
]);

export function validateNigeriaHoliday(date: string): boolean {
  const [year, month, day] = date.split('-');
  const fechaMMDD = `${month}-${day}`;
  return nigeriaPublicHolidays.has(fechaMMDD);
}