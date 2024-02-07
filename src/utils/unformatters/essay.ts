export function unformatEssayMillis(label: string): number {
  const [hours, minutes] = label.split('h');

  return Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000;
}
