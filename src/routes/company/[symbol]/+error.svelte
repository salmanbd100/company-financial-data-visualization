<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import IconAlert from '$lib/icons/IconAlert.svelte';
	import IconArrowLeft from '$lib/icons/IconArrowLeft.svelte';

	$: status = $page.status;
	$: message = $page.error?.message || 'Something went wrong';
</script>

<div class="container">
	<div class="content">
		<div class="error-icon">
			<IconAlert size={80} />
		</div>

		<h1>{status}</h1>
		<p class="error-message">
			{#if status === 404}
				No company found matching your search. Please check the name or symbol and try again.
			{:else if status === 500}
				Failed to fetch company data. Please try again later.
			{:else}
				{message}
			{/if}
		</p>

		<div class="actions">
			<button class="primary-btn" on:click={() => goto('/')}>
				<IconArrowLeft size={20} />
				Back to Search
			</button>
		</div>

		<div class="suggestions">
			<p class="suggestions-title">Try searching for popular companies:</p>
			<div class="symbol-tags">
				<button class="symbol-tag" on:click={() => goto('/company/MSFT')}>Microsoft</button>
				<button class="symbol-tag" on:click={() => goto('/company/AAPL')}>Apple</button>
				<button class="symbol-tag" on:click={() => goto('/company/TSLA')}>Tesla</button>
				<button class="symbol-tag" on:click={() => goto('/company/GOOGL')}>Alphabet</button>
				<button class="symbol-tag" on:click={() => goto('/company/AMZN')}>Amazon</button>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%);
		padding: 2rem;
	}

	.content {
		width: 100%;
		max-width: 600px;
		text-align: center;
	}

	.error-icon {
		color: #ef4444;
		margin-bottom: 2rem;
		display: flex;
		justify-content: center;
	}

	h1 {
		color: white;
		font-size: 4rem;
		font-weight: 700;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
	}

	.error-message {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.25rem;
		margin-bottom: 3rem;
		line-height: 1.6;
	}

	.actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	.primary-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 2rem;
		background: #3b82f6;
		border: none;
		border-radius: 0.75rem;
		color: white;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.primary-btn:hover {
		background: #2563eb;
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
	}

	.suggestions {
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.suggestions-title {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.875rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.symbol-tags {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.symbol-tag {
		padding: 0.5rem 1.25rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 9999px;
		color: white;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		backdrop-filter: blur(10px);
	}

	.symbol-tag:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: #3b82f6;
		transform: translateY(-2px);
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 3rem;
		}

		.error-message {
			font-size: 1rem;
		}

		.primary-btn {
			padding: 0.875rem 1.5rem;
			font-size: 0.9375rem;
		}

		.symbol-tags {
			gap: 0.5rem;
		}

		.symbol-tag {
			padding: 0.375rem 1rem;
			font-size: 0.8125rem;
		}
	}
</style>
