<script>
	const planetData = [
		{ name: 'Mercury', period: 88.0, distance: 57.9, startDegrees: 0 },
		{ name: 'Venus', period: 224.7, distance: 108.2, startDegrees: 0 },
		{ name: 'Earth', period: 365.2, distance: 149.6, startDegrees: 0 }
	];

	const startDate = new Date(2020, 0, 1);
	const date = new Date();

	function getOrbitFraction(planet) {
		const diff = date.getTime() - startDate.getTime();
		const period = planet.period * 24 * 60 * 60 * 1000;
		const orbitDegrees = ((diff % period) / period) * 360;
		return orbitDegrees;
	}

	function degreesToCoordinates(degrees, radius) {
		const radians = (degrees * Math.PI) / 180;
		const x = radius * Math.cos(radians);
		const y = radius * Math.sin(radians);
		return { x, y };
	}
</script>

<div class="page">
	<svg viewBox="0 0 1000 1000">
		<circle cx={500} cy={500} r={20} fill="yellow" />
		{#each planetData as planet}
			{@const { x, y } = degreesToCoordinates(getOrbitFraction(planet), planet.distance)}
			<circle cx={x} cy={y} r={planet.distance} fill="blue" />
		{/each}
	</svg>
</div>

<style>
	.page {
	}
</style>
