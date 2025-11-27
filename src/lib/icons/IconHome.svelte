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
  <path
    d="M3 12L12 3L21 12M5 10V20H11V14H13V20H19V10"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
