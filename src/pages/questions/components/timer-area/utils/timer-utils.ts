export function milisToFormattedTime(amount: number) {
  function doubleDigitTimeCheck(value: number) {
    return value >= 10 ? `${value}` : `0${value.toString()}`;
  }

  const questionMillis = amount < 0 ? (amount * -1) : amount;

  const minutes = Math.floor(questionMillis / 1000 / 60);
  const seconds = Math.floor((questionMillis - (1000 * 60 * minutes)) / 1000);
  const milisseconds = questionMillis - ((1000 * 60 * minutes) + (1000 * seconds));

  const fomarttedMinutes = doubleDigitTimeCheck(minutes);
  const formattedSeconds = doubleDigitTimeCheck(seconds);
  const formattedMilisseconds = milisseconds != 0 ? milisseconds.toString().substring(0, 2) : '00';

  return `${fomarttedMinutes}:${formattedSeconds}:${formattedMilisseconds}`;
}
