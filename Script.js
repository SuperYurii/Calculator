/**
 * Преобразует значение в целое число по выбранному режиму.
 * @param {number|string} value - число или числовая строка
 * @param {"truncate"|"floor"|"ceil"|"round"} mode - режим преобразования
 * @returns {number}
 */
export function intify(value, mode = "truncate") {
  // Преобразуем строку в число, проверяем корректность
  const num = typeof value === "string" ? Number(value.trim()) : value;

  if (!Number.isFinite(num)) {
    throw new TypeError(`intify: expected a finite number, got "${value}"`);
  }

  switch (mode) {
    case "truncate": // отбрасывает дробную часть к нулю
      return num < 0 ? Math.ceil(num) : Math.trunc(num);
    case "floor": // вниз (к -∞)
      return Math.floor(num);
    case "ceil": // вверх (к +∞)
      return Math.ceil(num);
    case "round": // математическое округление
      return Math.round(num);
    default:
      throw new Error(`intify: unknown mode "${mode}"`);
  }
}

// Небольшие примеры:
console.log(intify(12.9)); // 12 (truncate по умолчанию)
console.log(intify(-12.9)); // -12 (truncate)
console.log(intify(12.9, "floor")); // 12
console.log(intify(12.1, "ceil")); // 13
console.log(intify(12.5, "round")); // 13
console.log(intify("-3.7", "truncate")); // -3
