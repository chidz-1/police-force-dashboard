export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

export function formatRatio(value: number) {
  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 3,
  }).format(value);
}

export function formatFixedPercentage(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercentage(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}
