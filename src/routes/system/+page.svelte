<script>
	import planetData from '$lib/data/planetData.js';

	const curr = 6;
	const currCoords = getCoords(planetData[curr]);
	const originX = currCoords.x;
	const originY = currCoords.y;

	$: calculated = planetData.map((planet) => {
		return {
			...planet,
			...getCoords(planet)
		};
	});

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
		const diff = new Date().getTime() - new Date(2000, 0, 1);
		const period = planet.period * 24 * 60 * 60 * 1000;
		const degrees = ((diff % period) / period) * 360 + planet.startDegrees;
		const radians = (degrees * Math.PI) / 180;
		const x = scaleDistance(planet.distance) * Math.cos(radians + Math.PI) + 500;
		const y = scaleDistance(planet.distance) * Math.sin(radians + Math.PI) + 500;
		return { x, y };
	}
</script>

<svg viewBox="0 0 1000 1000">
	<circle cx={500} cy={500} r={20} fill="#ffec4c" />
	{#each calculated as planet}
		<circle
			class="orbit"
			cx={500}
			cy={500}
			r={scaleDistance(planet.distance)}
			stroke="currentColor"
			stroke-width="2"
			fill="none"
		/>
	{/each}
	{#each calculated as planet, i}
		{#if i !== curr}
			<line
				x1={planet.x}
				y1={planet.y}
				x2={originX}
				y2={originY}
				stroke="currentColor"
				stroke-width="6"
			/>
		{/if}
	{/each}
	{#each calculated as planet}
		<circle
			class="planet"
			cx={planet.x}
			cy={planet.y}
			r={scaleDiameter(planet.diameter)}
			fill={planet.color}
		/>
		<text
			x={planet.x}
			y={planet.y + scaleDiameter(planet.diameter) + 20}
			text-anchor="middle"
			fill="white"
		>
			{planet.name}
		</text>
	{/each}
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
	.orbit {
		color: var(--bg-2);
		z-index: -1;
	}
	text {
		font-weight: 300;
		font-size: 0.75rem;
	}
	line {
		color: color-mix(in srgb, var(--fg), transparent 80%);
		transition: color 0.1s;
	}
	line:hover {
		cursor: pointer;
		color: color-mix(in srgb, var(--fg), transparent 50%);
	}
</style>
