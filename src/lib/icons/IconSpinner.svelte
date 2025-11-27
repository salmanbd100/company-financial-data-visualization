<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
    ariaLabel?: string;
  }

  let { size = 20, class: className = '', ariaLabel }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 20 20"
  fill="none"
  class={className}
  aria-label={ariaLabel}
  role={ariaLabel ? 'img' : 'presentation'}
>
  <circle
    cx="10"
    cy="10"
    r="8"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-dasharray="40"
    stroke-dashoffset="10"
    opacity="0.5"
  />
</svg>

<style>
  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
