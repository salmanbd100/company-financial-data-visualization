<script lang="ts">
  interface Props {
    onclick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    ariaLabel?: string;
    children?: any;
  }

  let { onclick, type = 'button', ariaLabel, children }: Props = $props();
</script>

<button {type} class="icon-btn" on:click={onclick} aria-label={ariaLabel}>
  {@render children?.()}
</button>

<style>
  .icon-btn {
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

  .icon-btn:hover {
    color: rgba(255, 255, 255, 1);
  }
</style>
