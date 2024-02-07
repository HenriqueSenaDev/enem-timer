export function unformatQuestionMillis(label: string): number {
  const [minutes, seconds] = label.split('m');

  return Number(minutes) * 60 * 1000 + Number(seconds) * 1000;
}
