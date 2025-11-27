<script lang="ts">
  interface Props {
    onclick?: () => void;
    children?: any;
  }

  let { onclick, children }: Props = $props();
</script>

<button class="primary-btn" on:click={onclick}>
  {@render children?.()}
</button>

<style>
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
</style>
