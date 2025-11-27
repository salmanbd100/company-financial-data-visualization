<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import BasicStats from '$lib/components/BasicStats.svelte';
	import PriceChart from '$lib/components/PriceChart.svelte';
	import OwnershipTable from '$lib/components/OwnershipTable.svelte';
	import IconChevronLeft from '$lib/icons/IconChevronLeft.svelte';
	import IconExternalLink from '$lib/icons/IconExternalLink.svelte';

	export let data: PageData;

	const { symbol, quote, historical, ownership, wasResolved } = data;
</script>

<div class="container">
	<div class="header">
		<button class="back-button" onclick={() => goto('/')}>
			<IconChevronLeft size={20} />
			Back to Search
		</button>
		<h1>{quote.name} | {symbol}</h1>

		{#if wasResolved}
			<div class="resolution-info">
				Showing results for <strong>{quote.name}</strong> ({symbol})
			</div>
		{/if}
	</div>

	<div class="content">
		<div class="grid">
			<BasicStats {quote} />
			<PriceChart {historical} />
		</div>

		<div class="ownership-section">
			<h2>
				<a
					href="https://site.financialmodelingprep.com/developer/docs#acquisition-ownership"
					target="_blank"
					rel="noopener noreferrer"
				>
					Acquisition of Beneficial Ownership
					<IconExternalLink size={16} />
				</a>
			</h2>
			<OwnershipTable {ownership} />
		</div>
	</div>
</div>

<style>
	.container {
		min-height: 100vh;
		background: #f8fafc;
		padding: 2rem;
	}

	.header {
		max-width: 1400px;
		margin: 0 auto 2rem;
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		color: #475569;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
		margin-bottom: 1rem;
	}

	.back-button:hover {
		background: #f1f5f9;
		border-color: #cbd5e1;
	}

	h1 {
		color: #1e293b;
		font-size: 2rem;
		font-weight: 600;
		margin: 0;
	}

	.resolution-info {
		margin-top: 0.75rem;
		padding: 0.75rem 1rem;
		background: rgba(59, 130, 246, 0.1);
		border-left: 3px solid #3b82f6;
		border-radius: 0.5rem;
		color: #1e293b;
		font-size: 0.875rem;
	}

	.resolution-info strong {
		font-weight: 600;
		color: #3b82f6;
	}

	.content {
		max-width: 1400px;
		margin: 0 auto;
	}

	.grid {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.ownership-section {
		background: white;
		border-radius: 0.75rem;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.ownership-section h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1e293b;
		margin: 0 0 1rem 0;
	}

	.ownership-section h2 a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.ownership-section h2 a:hover {
		color: #3b82f6;
	}

	.ownership-section h2 a :global(svg) {
		opacity: 0.5;
	}

	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.container {
			padding: 1rem;
		}

		h1 {
			font-size: 1.5rem;
		}
	}
</style>
