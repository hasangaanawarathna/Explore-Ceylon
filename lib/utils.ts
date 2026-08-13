export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const FALLBACK_USD_TO_LKR_RATE = 336;

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

export function formatDualCurrency(
  usdAmount: number,
  usdToLkrRate = FALLBACK_USD_TO_LKR_RATE,
) {
  return `${formatLkr(usdAmount * usdToLkrRate)} (USD ${formatUsd(usdAmount)})`;
}

export async function getUsdToLkrRate() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      return FALLBACK_USD_TO_LKR_RATE;
    }

    const data = (await response.json()) as {
      rates?: {
        LKR?: number;
      };
    };

    return data.rates?.LKR ?? FALLBACK_USD_TO_LKR_RATE;
  } catch {
    return FALLBACK_USD_TO_LKR_RATE;
  }
}
