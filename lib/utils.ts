export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const USD_TO_LKR_RATE = 336;

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLkr(amount: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("LKR", "LKR ");
}

export function formatCurrency(amount: number) {
  return formatUsd(amount);
}

export function formatDualCurrency(usdAmount: number) {
  return `${formatLkr(usdAmount * USD_TO_LKR_RATE)} / ${formatUsd(usdAmount)}`;
}
