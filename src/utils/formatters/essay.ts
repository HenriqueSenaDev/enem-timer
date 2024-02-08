import { doubleDigitCheck } from "../masks/common";
import { extractTimeUnits } from "./common";

export function formatEssayMillis(milissecondsRest: number) {
  const { hours, minutes, seconds } = extractTimeUnits(milissecondsRest);

  const formattedHourds = doubleDigitCheck(hours);
  const fomarttedMinutes = doubleDigitCheck(minutes);
  const fomarttedSeconds = doubleDigitCheck(seconds);

  return `${formattedHourds}:${fomarttedMinutes}:${fomarttedSeconds}`;
}
