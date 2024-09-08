<script>
	import planetData from '$lib/data/planetData.js';

	const startDate = new Date(2000, 0, 1);

	function scaleDiameter(diameter) {
		const ratio = diameter / 4879;
		const log = Math.log2(ratio + 4);
		return log * 4;
	}

	function scaleDistance(distance) {
		const ratio = distance / 57.9;
		const log = Math.log2(ratio + 1);
		return log * 70;
	}

	function getCoords(planet) {
		const diff = new Date().getTime() - startDate.getTime();
		const period = planet.period * 24 * 60 * 60 * 1000;
		const degrees = ((diff % period) / period) * 360 + planet.startDegrees;
		const radians = (degrees * Math.PI) / 180;
		const x = scaleDistance(planet.distance) * Math.cos(radians + Math.PI) + 500;
		const y = scaleDistance(planet.distance) * Math.sin(radians + Math.PI) + 500;
		return { x, y };
	}
</script>

<div class="page">
	<svg viewBox="0 0 1000 1000">
		<circle cx={500} cy={500} r={20} fill="#ffec4c" />
		{#each planetData as planet, i}
			{@const { x, y } = getCoords(planet, i)}
			<circle
				cx={500}
				cy={500}
				r={scaleDistance(planet.distance)}
				stroke="#222"
				stroke-width="2"
				fill="none"
			/>
			<circle cx={x} cy={y} r={scaleDiameter(planet.diameter)} fill={planet.color} />
		{/each}
	</svg>
</div>

<style>
	.page {
	}

	svg {
		width: 100%;
		height: 100%;
	}
</style>
