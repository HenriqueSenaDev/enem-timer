import { doubleDigitCheck } from "../masks/common";

export function extractTimeUnits(questionMillis: number) {
  let minutes = Math.floor(questionMillis / 1000 / 60);
  minutes = minutes < 0 ? 0 : minutes;

  let seconds = Math.floor((questionMillis - (1000 * 60 * minutes)) / 1000);
  seconds = seconds < 0 ? 0 : seconds

  let milisseconds = questionMillis - ((1000 * 60 * minutes) + (1000 * seconds));

  return { minutes, seconds, milisseconds };
}

export function formatQuestionMillis(milissecondsRest: number) {
  let questionMillis: number = milissecondsRest;
  let isPositive: boolean = true;

  if (milissecondsRest < 0) {
    isPositive = false;
    // turn positive to prevent math sign errors
    questionMillis = milissecondsRest * -1;
  }

  const { minutes, seconds, milisseconds } = extractTimeUnits(questionMillis);

  const fomarttedMinutes = doubleDigitCheck(minutes);
  const formattedSeconds = doubleDigitCheck(seconds);
  const formattedMilisseconds = milisseconds > 0 ? milisseconds.toString().substring(0, 2) : '00';

  return `${isPositive ? '+' : '-'}${fomarttedMinutes}:${formattedSeconds}:${formattedMilisseconds}`;
}