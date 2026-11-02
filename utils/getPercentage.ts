export function getPercentage(numerator: number, denominator: number) {
  return Math.round((numerator / denominator) * 1000) / 10;
}
