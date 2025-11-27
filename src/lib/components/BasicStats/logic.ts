// Formatting utility functions for BasicStats component

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

export function formatCurrency(num: number): string {
  return num.toFixed(2) + ' USD';
}

export function formatPercentage(num: number): string {
  return num.toFixed(2) + '%';
}
