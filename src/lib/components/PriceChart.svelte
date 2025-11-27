<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import IconExternalLink from '$lib/icons/IconExternalLink.svelte';

	export let historical: any[];

	Chart.register(...registerables);

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;
	let selectedPeriod = 'ALL';

	const periods = [
		{ label: '1D', days: 1 },
		{ label: '5D', days: 5 },
		{ label: '1M', days: 30 },
		{ label: '3M', days: 90 },
		{ label: '6M', days: 180 },
		{ label: '1Y', days: 365 },
		{ label: '5Y', days: 1825 },
		{ label: 'ALL', days: null }
	];

	function getFilteredData(period: string) {
		const periodConfig = periods.find((p) => p.label === period);
		if (!periodConfig || !periodConfig.days) {
			return historical;
		}

		return historical.slice(0, periodConfig.days).reverse();
	}

	function updateChart(period: string) {
		selectedPeriod = period;
		const data = getFilteredData(period);

		if (chart) {
			chart.destroy();
		}

		const labels = data.map((item) => item.date);
		const prices = data.map((item) => item.close);

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Price',
						data: prices,
						borderColor: '#ef4444',
						backgroundColor: 'rgba(239, 68, 68, 0.1)',
						borderWidth: 2,
						fill: true,
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
						position: 'right',
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
		});
	}

	onMount(() => {
		updateChart('ALL');
	});

	function handlePeriodChange(period: string) {
		updateChart(period);
	}

	$: if (canvas && historical.length > 0) {
		updateChart(selectedPeriod);
	}

	// Calculate change percentage
	$: changePercentage = historical.length > 1
		? ((historical[0].close - historical[historical.length - 1].close) / historical[historical.length - 1].close) * 100
		: 0;
</script>

<div class="chart-card">
	<div class="header">
		<div class="title-section">
			<h3>
				<a
					href="https://site.financialmodelingprep.com/developer/docs#chart"
					target="_blank"
					rel="noopener noreferrer"
				>
					Price Chart
					<IconExternalLink size={16} />
				</a>
			</h3>
			<span class="change" class:positive={changePercentage >= 0} class:negative={changePercentage < 0}>
				Change: {changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(2)}%
			</span>
		</div>

		<div class="period-filters">
			{#each periods as period}
				<button
					class="period-btn"
					class:active={selectedPeriod === period.label}
					on:click={() => handlePeriodChange(period.label)}
				>
					{period.label}
				</button>
			{/each}
		</div>
	</div>

	<div class="chart-container">
		<canvas bind:this={canvas}></canvas>
	</div>
</div>

<style>
	.chart-card {
		background: white;
		border-radius: 0.75rem;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.header {
		margin-bottom: 1.5rem;
	}

	.title-section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1e293b;
		margin: 0;
	}

	h3 a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	h3 a:hover {
		color: #3b82f6;
	}

	h3 a :global(svg) {
		opacity: 0.5;
	}

	.change {
		font-size: 0.875rem;
		font-weight: 600;
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
	}

	.change.positive {
		background: #dcfce7;
		color: #16a34a;
	}

	.change.negative {
		background: #fee2e2;
		color: #dc2626;
	}

	.period-filters {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.period-btn {
		padding: 0.375rem 0.875rem;
		background: #f1f5f9;
		border: 1px solid #e2e8f0;
		border-radius: 0.375rem;
		color: #64748b;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.period-btn:hover {
		background: #e2e8f0;
		border-color: #cbd5e1;
	}

	.period-btn.active {
		background: #3b82f6;
		border-color: #3b82f6;
		color: white;
	}

	.chart-container {
		height: 400px;
		position: relative;
	}

	@media (max-width: 640px) {
		.period-filters {
			gap: 0.25rem;
		}

		.period-btn {
			padding: 0.25rem 0.625rem;
			font-size: 0.75rem;
		}

		.chart-container {
			height: 300px;
		}
	}
</style>
