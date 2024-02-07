export function extractTimeUnits(timeInMillis: number) {
  let rest = timeInMillis;

  let hours = Math.floor(timeInMillis / 1000 / 60 / 60);
  hours = hours < 0 ? 0 : hours;
  rest -= hours * 60 * 60 * 1000;

  let minutes = Math.floor(rest / 1000 / 60);
  minutes = minutes < 0 ? 0 : minutes;
  rest -= minutes * 60 * 1000;

  let seconds = Math.floor(rest / 1000);
  seconds = seconds < 0 ? 0 : seconds;
  rest -= seconds * 1000;

  return { hours, minutes, seconds, milisseconds: rest };
}
