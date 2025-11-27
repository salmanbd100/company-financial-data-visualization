<script lang="ts">
  import { navigating } from '$app/stores';
  import Loading from '$lib/components/Loading.svelte';

  let { children } = $props();
</script>

{#if $navigating}
  <Loading message="Loading company data..." />
{:else}
  {@render children()}
{/if}
