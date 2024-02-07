import { doubleDigitCheck } from "../masks/common";
import { extractTimeUnits } from "./common";

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
