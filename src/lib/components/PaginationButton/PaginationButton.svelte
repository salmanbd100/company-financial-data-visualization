<script lang="ts">
  interface Props {
    onclick?: () => void;
    disabled?: boolean;
    ariaLabel?: string;
    children?: any;
  }

  let { onclick, disabled = false, ariaLabel, children }: Props = $props();
</script>

<button class="pagination-btn" on:click={onclick} {disabled} aria-label={ariaLabel}>
  {@render children?.()}
</button>

<style>
  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-btn:hover:not(:disabled) {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
