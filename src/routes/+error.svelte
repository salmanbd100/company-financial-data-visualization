<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: status = $page.status;
	$: message = $page.error?.message || 'Something went wrong';
</script>

<div class="container">
	<div class="content">
		<div class="error-icon">
			<svg width="80" height="80" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
				<path
					d="M12 8V12M12 16H12.01"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		</div>

		<h1>{status}</h1>
		<p class="error-message">
			{#if status === 404}
				Page not found. The page you're looking for doesn't exist.
			{:else if status === 500}
				Internal server error. Something went wrong on our end.
			{:else}
				{message}
			{/if}
		</p>

		<div class="actions">
			<button class="primary-btn" on:click={() => goto('/')}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M3 12L12 3L21 12M5 10V20H11V14H13V20H19V10"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Go Home
			</button>
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
	}
</style>
