export default function safeRatio(
  numerator: number,
  denominator: number
): number | null {
  return denominator === 0 ? null : numerator / denominator;
}
