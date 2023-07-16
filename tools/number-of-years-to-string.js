export default function numberOfYearsToString(years = 0, plainText) {
  const number = +years;
  const lastDigit = +String(years).slice(-1);

  if (plainText) {
    if (number === 1 || (number > 11 && lastDigit === 1)) {
      return `${number} год`;
    } else if (
      (number === lastDigit || number > 14) &&
      (lastDigit === 2 || lastDigit === 3 || lastDigit === 4)
    ) {
      return `${number} года`;
    } else {
      return `${number} лет`;
    }
  } else {
    if (number === 1 || (number > 11 && lastDigit === 1)) {
      return `${number} года`;
    } else {
      return `${number} лет`;
    }
  }
}
