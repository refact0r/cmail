<script>
	import planetData from '$lib/data/planetData.js';
	import { getCoords, scaleDiam, scaleDist } from '$lib/js/planets.js';

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

	let popupCurr = 0;
	let popupVisible = false;
	let popupX = 0;
	let popupY = 0;

	function LineMouseOver(event, i) {
		popupVisible = true;
		popupCurr = i;
		const { clientX, clientY } = event;
		popupX = clientX + 10;
		popupY = clientY + 10;
	}
	function LineMouseOut() {
		popupVisible = false;
	}
	function LineMouseMove(event) {
		const { clientX, clientY } = event;
		popupX = clientX + 10;
		popupY = clientY + 10;
	}
</script>

<svg viewBox="0 0 1000 1000">
	<circle cx={500} cy={500} r={20} fill="#ffec4c" />
	{#each calculated as planet}
		<circle
			class="orbit"
			cx={500}
			cy={500}
			r={scaleDist(planet.distance)}
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
				stroke-width="8"
				on:mouseover|preventDefault={(event) => LineMouseOver(event, i)}
				on:mousemove|preventDefault={(event) => LineMouseMove(event)}
				on:mouseout|preventDefault={() => LineMouseOut()}
			/>
		{/if}
	{/each}
	{#each calculated as planet}
		<circle
			class="planet"
			cx={planet.x}
			cy={planet.y}
			r={scaleDiam(planet.diameter)}
			fill={planet.color}
		/>
		<text
			x={planet.x}
			y={planet.y + scaleDiam(planet.diameter) + 20}
			text-anchor="middle"
			fill="white"
		>
			{planet.name}
		</text>
	{/each}
</svg>

{#if popupVisible}
	<div class="popup" style="left: {popupX}px; top: {popupY}px;">
		<h3>{calculated[popupCurr].name}</h3>
		<p>Distance from Sun: {calculated[popupCurr].distance} AU</p>
		<p>Orbital Period: {calculated[popupCurr].period} years</p>
	</div>
{/if}

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
	.popup {
		position: fixed;
		background-color: var(--bg-2);
		/* border: 2px solid var(--fg-3); */
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-radius: 1rem;
	}
	.popup h3,
	.popup p {
		margin: 0;
	}
</style>
