export function isValidDate(date) {
  const parsedDate = new Date(date);
  return parsedDate instanceof Date && !isNaN(parsedDate);
}
