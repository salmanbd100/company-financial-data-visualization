<script lang="ts">
	import { goto } from '$app/navigation';
	import IconClose from '$lib/icons/IconClose.svelte';
	import IconSpinner from '$lib/icons/IconSpinner.svelte';

	let companyName = $state('');
	let isSearching = $state(false);

	async function handleSearch(event: Event) {
		event.preventDefault();
		const trimedCompanyName = companyName.trim();
		if (trimedCompanyName) {
			isSearching = true;
			await goto(`/company/${trimedCompanyName}`);
			isSearching = false;
		}
	}

	function clearSearch() {
		companyName = '';
	}
</script>

<div class="container">
	<div class="content">
		<h1>Veyt Assignment</h1>
		<p class="subtitle">Search by company name or stock symbol (e.g., "Microsoft" or "MSFT")</p>
		<form onsubmit={handleSearch}>
			<div class="search-box">
				<input
					type="text"
					bind:value={companyName}
					placeholder="Microsoft or MSFT"
					class="search-input"
					disabled={isSearching}
				/>
				{#if isSearching}
					<div class="loading-spinner">
						<IconSpinner size={20} />
					</div>
				{:else if companyName}
					<button type="button" class="clear-btn" onclick={clearSearch} aria-label="Clear search">
						<IconClose size={20} ariaLabel="Clear search" />
					</button>
				{/if}
			</div>
		</form>
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

	h1 {
		color: white;
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 1rem;
		letter-spacing: 0.5px;
	}

	.subtitle {
		color: rgba(255, 255, 255, 0.7);
		font-size: 1rem;
		margin-bottom: 2rem;
	}

	.search-box {
		position: relative;
		width: 100%;
	}

	.search-input {
		width: 100%;
		padding: 1rem 3rem 1rem 1.5rem;
		font-size: 1.125rem;
		border: 2px solid #3b82f6;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		outline: none;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.search-input:focus {
		background: rgba(255, 255, 255, 0.15);
		border-color: #60a5fa;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	.clear-btn {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.7);
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.2s ease;
	}

	.clear-btn:hover {
		color: rgba(255, 255, 255, 1);
	}

	.loading-spinner {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: #3b82f6;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-input:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 2rem;
		}

		.search-input {
			font-size: 1rem;
		}
	}
</style>
