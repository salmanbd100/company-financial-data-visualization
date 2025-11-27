<script lang="ts">
  interface Props {
    onclick?: () => void;
    children?: any;
  }

  let { onclick, children }: Props = $props();
</script>

<button class="tag-btn" on:click={onclick}>
  {@render children?.()}
</button>

<style>
  .tag-btn {
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

  .tag-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #3b82f6;
    transform: translateY(-2px);
  }
</style>
