<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import BasicStats from '$lib/components/BasicStats.svelte';
	import PriceChart from '$lib/components/PriceChart.svelte';
	import OwnershipTable from '$lib/components/OwnershipTable.svelte';

	export let data: PageData;

	const { symbol, quote, historical, ownership, wasResolved, originalInput } = data;
</script>

<div class="container">
	<div class="header">
		<button class="back-button" on:click={() => goto('/')}>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path
					d="M12 16L6 10L12 4"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
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
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path
							d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333M10 2H14M14 2V6M14 2L6.66667 9.33333"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
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

	.ownership-section h2 a svg {
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
