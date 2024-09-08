<script>
	import SolarSystem from '$lib/components/SolarSystem.svelte';

	export let data;
</script>

<div class="page">
	<div class="side">
		<div class="new box">
			<h2>New</h2>
		</div>
	</div>
	<div class="system">
		<SolarSystem {data} />
	</div>
	<div class="side">
		<div class="outgoing box">
			<h2>Outgoing</h2>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		margin-top: 0rem;
	}
	.side {
		width: 25%;
		display: flex;
		align-items: center;
		padding: 1rem;
	}
	.box {
		background: var(--bg-2);
		border-radius: 1rem;
		border: 2px solid var(--bg-3);
		padding: 1rem;
		width: 100%;
	}
	.box h2 {
		margin: 0 0 1rem 0;
	}
	.system {
		width: 50%;
		display: flex;
	}
</style>
