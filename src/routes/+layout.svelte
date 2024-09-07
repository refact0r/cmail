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
			<div class="logo">
				<h1>Placeholder</h1>
			</div>
			<div class="navbar">
				<a class="selected" href="/test">‎ Home ‎</a>
				<a href="/test/inbox">‎ Inbox ‎</a>
				<a href="/test/send">‎ Send ‎</a>
				<a href="/test/about">‎ About ‎</a>
			</div>
			<div class="box">
				<div class="server-select">
					<label for="server">Server: </label>
					<select name="server" id="server">
						<option value="earth">Earth</option>
						<option value="moon">Moon</option>
						<option value="mars">Mars</option>
					  </select>
				</div>
			</div>
			
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

	.logo{
        text-align: center;
    }
    a {
        color: white;
        text-decoration: none;
    }
    .navbar{
        text-align: center;
        
    }
	.selected{
        color: black;
        background-color: white;
    }
	.server-select{
        text-align: center;
    }
	.box{
		padding-top: 1rem;
	}
</style>
