<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
    ariaLabel?: string;
  }

  let { size = 24, class: className = '', ariaLabel }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  class={className}
  aria-label={ariaLabel}
  role={ariaLabel ? 'img' : 'presentation'}
>
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
  <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
