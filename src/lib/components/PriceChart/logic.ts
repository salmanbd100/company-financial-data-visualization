import { Chart, registerables } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export interface Period {
  label: string;
  days: number | null;
}

export const periods: Period[] = [
  { label: '1D', days: 1 },
  { label: '5D', days: 5 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: '1Y', days: 365 },
  { label: '5Y', days: 1825 },
  { label: 'ALL', days: null }
];

export function getFilteredData(historical: any[], period: string) {
  const periodConfig = periods.find((p) => p.label === period);
  if (!periodConfig || !periodConfig.days) {
    return historical;
  }

  return historical.slice(0, periodConfig.days).reverse();
}

export function createChartConfig(data: any[]): ChartConfiguration<'line'> {
  const labels = data.map((item) => item.date);
  const prices = data.map((item) => item.close);

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Price',
          data: prices,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 1,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function (context) {
              return `Price: $${context.parsed.y?.toFixed(2) ?? 'N/A'}`;
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false
          },
          ticks: {
            maxTicksLimit: 10,
            autoSkip: true
          }
        },
        y: {
          display: true,
          position: 'left',
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function (value) {
              return '$' + value;
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  };
}

export function calculateChangePercentage(historical: any[]): number {
  if (historical.length < 2) return 0;

  return (
    ((historical[0].close - historical[historical.length - 1].close) /
      historical[historical.length - 1].close) *
    100
  );
}
