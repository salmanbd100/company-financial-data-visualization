<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import IconAlert from '$lib/icons/IconAlert.svelte';
  import IconHome from '$lib/icons/IconHome.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton';

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
        Page not found. The page you're looking for doesn't exist.
      {:else if status === 500}
        Internal server error. Something went wrong on our end.
      {:else}
        {message}
      {/if}
    </p>

    <div class="actions">
      <PrimaryButton onclick={() => goto('/')}>
        <IconHome size={20} />
        Go Home
      </PrimaryButton>
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

  @media (max-width: 640px) {
    h1 {
      font-size: 3rem;
    }

    .error-message {
      font-size: 1rem;
    }
  }
</style>
