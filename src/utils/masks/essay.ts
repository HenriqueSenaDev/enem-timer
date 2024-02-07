export function essayTimeMask(input: string): string {
  return input.length <= 2
    ? input.replace(/(\d{1})(\d{1})/, '$1h$2')
    : input.replace(/(\d{1})(\d{2})/, '$1h$2');
}
