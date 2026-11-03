export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

export function formatPercentage(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}
