export function doubleDigitCheck(value: number) {
  return value >= 10 ? `${value}` : `0${value.toString()}`;
}
