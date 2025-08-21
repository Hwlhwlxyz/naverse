<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css"
>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
