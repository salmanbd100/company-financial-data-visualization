<script lang="ts">
  interface Props {
    onclick?: () => void;
    active?: boolean;
    children?: any;
  }

  let { onclick, active = false, children }: Props = $props();
</script>

<button class="filter-btn" class:active on:click={onclick}>
  {@render children?.()}
</button>

<style>
  .filter-btn {
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

  .filter-btn:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
  }

  .filter-btn.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
  }
</style>
