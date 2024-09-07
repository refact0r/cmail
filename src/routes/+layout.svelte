<script>
	import '../app.scss';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<!--<svelte:head>
	<meta name="color-scheme" content={theme} />
	<link rel="stylesheet" href={`/theme/${theme}.css`} />
</svelte:head>-->

<div class="app">
	{#key data.pathname}
		<div class="main" in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
			<slot />
		</div>
	{/key}
</div>

<style lang="scss">
	.app {
		height: 100%;
		min-height: 100vh;
	}

	.main {
		height: 100%;
		min-height: 100vh;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding: 1.5rem 0;
	}
</style>
