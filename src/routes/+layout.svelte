<script>
	import '../app.css';
	import { fade } from 'svelte/transition';
	import IconSS from "phosphor-svelte/lib/ShootingStar";
	import IconMail from "phosphor-svelte/lib/EnvelopeSimpleOpen";
	import IconSend from "phosphor-svelte/lib/PaperPlaneTilt";
	import IconAbout from "phosphor-svelte/lib/Question";
	import { profile } from '$lib/stores/profile.js';

	export let data;

</script>

<div class="app">
	{#key data.pathname}
		<div class="main">
			<div class="navbar">
				<div class="title">
					<a class="brand" href="/test" title="starbound">starbound <IconSS /></a>
				</div>
				<div class="items">
					<div class="selector">
						<label for="server">Profile: </label>
						<select name="server" id="server" title="Select planet" bind:value={$profile}>
							<option value="mercury" title="Mercury">Mercury</option>
							<option value="venus" title="Venus">Venus</option>
							<option value="earth" title="Earth">Earth</option>
							<option value="moon" title="Moon">Moon</option>
							<option value="mars" title="Mars">Mars</option>
							<option value="jupiter" title="Jupiter">Jupiter</option>
							<option value="saturn" title="Saturn">Saturn</option>
							<option value="uranus" title="Uranus">Uranus</option>
							<option value="neptune" title="Neptune">Neptune</option>
							<option value="pluto" title="Pluto">Pluto</option>
						</select>
					</div>
					<a class="item" href="/test/inbox" title="Inbox"><IconMail /></a>
					<a class="item" href="/test/send" title="Send messages"><IconSend /></a>
					<a class="item" href="/test/about" title="About"><IconAbout /></a>
				</div>
			</div>
			<div class="content" in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
				<slot />
			</div>
		</div>
	{/key}
</div>

<style>
	.app {
		height: 100%;
		min-height: 100vh;
	}

	.main {
		height: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding: 0 0 1.5rem 0;
	}

    a {
        color: var(--fg);
        text-decoration: none;
    }
	
    .navbar{
		display: flex;
		gap: 3rem;
		justify-content: space-between;
		align-items: start;
		padding: 1rem 2rem 0rem;
        font-family: 'Orbitron', sans-serif;
    }
	label{
		color: var(--fg);
	}
	.brand {
		font-size: 2rem;
		color: var(--fg);
		transition: .3s;
	}
	.brand:hover{
		font-weight: bold;
	}
	.items{
		display: flex;
		gap: 2rem;
	}
	.item{
		font-size: 2rem;
		padding: .5rem .5rem 0rem;
		border-radius: 4rem;
		justify-content: center;
		align-items: center;
		transition: .3s;
	}
	.item:hover{
		color: var(--bg);
		background-color: var(--fg);
	}
	.selector{
        margin-top: 2vh;
    }
	select{
		border-radius: .2rem;
		outline: none;
		font-family: 'Orbitron', sans-serif;
		background-color: var(--bg);
		color: var(--fg);
		width: 8vw;
		transition: .3s;
	}
	select:hover{
		background-color: var(--fg);
		color: var(--bg);
	}

	.content{
		padding: 1rem 2rem 0rem;
	}
</style>
