<script lang="ts">
  interface Props {
    onclick?: () => void;
    children?: any;
  }

  let { onclick, children }: Props = $props();
</script>

<button class="back-button" on:click={onclick}>
  {@render children?.()}
</button>

<style>
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
  }

  .back-button:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
</style>
