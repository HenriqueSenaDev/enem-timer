export function questionTimeMask(input: string): string {
  return input.length <= 3
    ? input.replace(/(\d{2})(\d{1})/, '$1m$2')
    : input.replace(/(\d{2})(\d{2})/, '$1m$2');
}
