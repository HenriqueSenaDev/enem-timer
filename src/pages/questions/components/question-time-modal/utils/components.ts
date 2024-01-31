export function questionTimeMask(input: string): string {
  return input.length <= 3
    ? input.replace(/(\d{2})(\d{1})/, '$1m$2')
    : input.replace(/(\d{2})(\d{2})/, '$1m$2');
}

export function timeLabelToMilis(label: string): number {
  const [minutes, seconds] = label.split('m');

  return Number(minutes) * 60 * 1000 + Number(seconds) * 1000;
}
