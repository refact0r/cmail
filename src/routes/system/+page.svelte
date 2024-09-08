<script>
	import planetData from '$lib/data/planetData.js';
	import { coords, dist, sunDist, scaleDiam, scaleDist } from '$lib/js/planets.js';
	import { formatAU, formatSecs } from '$lib/js/utils.js';
	import * as constants from '$lib/js/constants.js';

	export let data;

	const curr = 6;
	$: currDisplay = coords(planetData[curr], data.data[planetData[curr].name]);

	$: calc = planetData.map((planet) => {
		const currDist = dist(data.data[planetData[curr].name], data.data[planet.name]);
		return {
			...planet,
			...coords(planet, data.data[planet.name]),
			...data.data[planet.name],
			currDist,
			currTime: (currDist / constants.c) * 1000,
			sunDist: sunDist(data.data[planet.name])
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

<div class="page">
	<div class="left"></div>
	<div class="system">
		<svg viewBox="0 0 1000 1000">
			<circle cx={500} cy={500} r={30} fill="#ffec4c" />
			{#each calc as planet}
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
			{#each calc as planet, i}
				{#if i !== curr}
					<line
						x1={planet.displayX}
						y1={planet.displayY}
						x2={currDisplay.displayX}
						y2={currDisplay.displayY}
						stroke="currentColor"
						stroke-width="10"
						tabindex="0"
						role="button"
						on:mouseover|preventDefault={(event) => LineMouseOver(event, i)}
						on:focus|preventDefault={(event) => LineMouseOver(event, i)}
						on:mousemove|preventDefault={(event) => LineMouseMove(event)}
						on:mouseout|preventDefault={() => LineMouseOut()}
						on:blur|preventDefault={() => LineMouseOut()}
					/>
				{/if}
			{/each}
			{#each calc as planet, i}
				{#if i === curr}
					<circle
						class="planet"
						cx={planet.displayX}
						cy={planet.displayY}
						r={scaleDiam(planet.diameter)}
						fill={planet.color}
					/>
					<text
						x={planet.displayX}
						y={planet.displayY + scaleDiam(planet.diameter) + 20}
						text-anchor="middle"
						fill="white"
					>
						{planet.name}
					</text>
				{:else}
					<circle
						class="planet"
						cx={planet.displayX}
						cy={planet.displayY}
						r={scaleDiam(planet.diameter)}
						fill={planet.color}
						tabindex="0"
						role="button"
						on:mouseover|preventDefault={(event) => LineMouseOver(event, i)}
						on:focus|preventDefault={(event) => LineMouseOver(event, i)}
						on:mousemove|preventDefault={(event) => LineMouseMove(event)}
						on:mouseout|preventDefault={() => LineMouseOut()}
						on:blur|preventDefault={() => LineMouseOut()}
					/>
					<text
						x={planet.displayX}
						y={planet.displayY + scaleDiam(planet.diameter) + 20}
						text-anchor="middle"
						fill="white"
						tabindex="0"
						role="button"
						on:mouseover|preventDefault={(event) => LineMouseOver(event, i)}
						on:focus|preventDefault={(event) => LineMouseOver(event, i)}
						on:mousemove|preventDefault={(event) => LineMouseMove(event)}
						on:mouseout|preventDefault={() => LineMouseOut()}
						on:blur|preventDefault={() => LineMouseOut()}
					>
						{planet.name}
					</text>
				{/if}
			{/each}
		</svg>
	</div>
	<div class="right"></div>
</div>

{#if popupVisible}
	<div class="popup" style="left: {popupX}px; top: {popupY}px;">
		<h3>{calc[popupCurr].name}</h3>
		<p>distance from sun: {formatAU(calc[popupCurr].sunDist)} AU</p>
		<p>distance from {planetData[curr].name}: {formatAU(calc[popupCurr].currDist)} AU</p>
		<p>
			message time from {planetData[curr].name}: {formatSecs(calc[popupCurr].currTime)}
		</p>
	</div>
{/if}

<style>
	.page {
		display: flex;
	}
	.left {
		width: 30%;
	}
	.right {
		width: 30%;
	}
	.system {
		width: 40%;
	}
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
		font-size: 0.875rem;
	}
	text:hover {
		cursor: pointer;
	}
	.planet:hover {
		cursor: pointer;
		filter: brightness(1.2);
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
