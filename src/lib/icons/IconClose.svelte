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
	<circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.3" />
	<path
		d="M7 7L13 13M13 7L7 13"
		stroke="white"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
