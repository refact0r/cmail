<script>
	import '../app.css';
	import '@fontsource-variable/dm-sans';
	import '@fontsource/dm-mono';
	import { fade } from 'svelte/transition';
	import IconSS from 'phosphor-svelte/lib/ShootingStar';
	import IconMoon from 'phosphor-svelte/lib/StarAndCrescent';
	import IconSparkle from 'phosphor-svelte/lib/Sparkle';
	import IconMail from 'phosphor-svelte/lib/EnvelopeSimpleOpen';
	import IconSend from 'phosphor-svelte/lib/PaperPlaneTilt';
	import IconAbout from 'phosphor-svelte/lib/Question';
	import { profile } from '$lib/stores/profile.js';

	import { SvelteToast } from '@zerodevx/svelte-toast';

	export let data;
</script>

<div class="app">
	<SvelteToast />
	<nav>
		<a class="title" href="/">
			<IconSparkle style="font-size: 1.5rem;" />
			<h1>cmail</h1>
		</a>
		<div class="items">
			<select bind:value={$profile}>
				{#each Object.keys(data.planets) as planet}
					<option value={planet}>{planet}</option>
				{/each}
			</select>
			<a class="item" href="/inbox" title="Inbox"><IconMail /></a>
			<a class="item" href="/test/send" title="Send messages"><IconSend /></a>
			<a class="item" href="/about" title="About"><IconAbout /></a>
		</div>
	</nav>
	<div class="transition">
		{#key data.pathname}
			{#if !data.pathname.includes('/inbox/')}
				<div class="content" in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
					<slot />
				</div>
			{:else}
				<div class="content">
					<slot />
				</div>
			{/if}
		{/key}
	</div>
</div>

<style>
	.app {
		height: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.transition {
		display: grid;
		flex: 1;
	}
	.content {
		display: flex;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.title {
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-radius: 1rem;
		border: 2px solid transparent;
		transition: 0.1s;
	}
	h1 {
		/* font-family: 'DM Mono', monospace; */
		font-weight: 500;
		margin: 0;
		height: auto;
	}
	.title:hover {
		background-color: var(--bg-2);
		border-color: var(--bg-3);
	}

	nav {
		display: flex;
		gap: 3rem;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem 0rem;
		position: absolute;
		width: 100%;
		height: 4rem;
	}

	select {
		border: 2px solid var(--bg-2);
		padding: 0.5rem 0.75rem;
		border-radius: 1rem;
		background-color: var(--bg);
		font: inherit;
		color: inherit;
		transition: 0.1s;
	}
	select:hover {
		cursor: pointer;
		background-color: var(--bg-2);
		border-color: var(--bg-3);
	}

	.items {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}
	.item {
		font-size: 1.5rem;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid transparent;
		transition: 0.1s;
	}
	.item:hover {
		background-color: var(--bg-2);
		border-color: var(--bg-3);
	}

	:root {
		--toastContainerTop: auto;
		--toastContainerBottom: 1.5rem;
		--toastBorderRadius: 1rem;
		--toastBackground: var(--bg-2);
		--toastBorder: 2px solid var(--bg-5);
		--toastBarHeight: 2px;
		--toastBarBackground: var(--fg-3);
	}
</style>
