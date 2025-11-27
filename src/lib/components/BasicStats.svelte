<script lang="ts">
  export let quote: any;

  function formatNumber(num: number): string {
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

  function formatCurrency(num: number): string {
    return num.toFixed(2) + ' USD';
  }

  function formatPercentage(num: number): string {
    return num.toFixed(2) + '%';
  }
</script>

<div class="stats-card">
  <div class="header">
    <h3>Basic Stats</h3>
    <span class="badge">Today</span>
  </div>

  <div class="stats-list">
    <div class="stat-item">
      <span class="label">Price</span>
      <span class="value">{formatCurrency(quote.price)}</span>
    </div>

    <div class="stat-item">
      <span class="label">52 Week Low:</span>
      <span class="value">{formatCurrency(quote.yearLow)}</span>
    </div>

    <div class="stat-item">
      <span class="label">52 Week High:</span>
      <span class="value">{formatCurrency(quote.yearHigh)}</span>
    </div>

    <div class="stat-item">
      <span class="label">Market Cap:</span>
      <span class="value">{formatNumber(quote.marketCap)} USD</span>
    </div>

    <div class="stat-item">
      <span class="label">Shares Outstanding:</span>
      <span class="value">{formatNumber(quote.sharesOutstanding)}</span>
    </div>

    <div class="stat-item">
      <span class="label">Free Float:</span>
      <span class="value"
        >{quote.volume
          ? formatPercentage((quote.volume / quote.sharesOutstanding) * 100)
          : 'N/A'}</span
      >
    </div>

    <div class="stat-item">
      <span class="label">Avg. Trading Volume:</span>
      <span class="value">{formatNumber(quote.avgVolume)}</span>
    </div>
  </div>
</div>

<style>
  .stats-card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: fit-content;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .badge {
    background: #ede9fe;
    color: #7c3aed;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .stats-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }

  .value {
    font-size: 1rem;
    color: #1e293b;
    font-weight: 600;
  }
</style>
