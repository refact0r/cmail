<script>
	import SolarSystem from '$lib/components/SolarSystem.svelte';

	export let data;
</script>

<div class="page">
	<div class="left"></div>
	<div class="system">
		<SolarSystem {data} />
	</div>
	<div class="right"></div>
</div>

<style>
	.page {
		display: flex;
	}
	.left {
		width: 25%;
	}
	.right {
		width: 25%;
	}
	.system {
		width: 50%;
		display: flex;
	}
</style>
