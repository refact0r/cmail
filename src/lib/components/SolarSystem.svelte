<script>
	import { coords, dist, sunDist, scaleDiam, scaleDist } from '$lib/js/planets.js';
	import { formatAU, formatSecs } from '$lib/js/utils.js';
	import * as constants from '$lib/js/constants.js';
	import { profile } from '$lib/stores/profile.js';

	export let data;

	$: console.log(data);

	$: currDisplay = coords(data.planets[$profile]);

	$: calc = Object.values(data.planets)
		.map((planet) => {
			const currDist = dist(data.planets[$profile], data.planets[planet.name]);
			return {
				...planet,
				...coords(planet),
				currDist,
				currTime: (currDist / constants.c) * 1000,
				sunDist: sunDist(planet)
			};
		})
		.sort((a, b) => a.index - b.index);

	let popupIndex = 0;
	let popupVisible = false;
	let popupX = 0;
	let popupY = 0;

	function LineMouseOver(event, i) {
		popupVisible = true;
		popupIndex = i;
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
	function LineMouseUp(i) {
		console.log(i);
	}
</script>

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
		{#if planet.name !== $profile}
			<a
				href="/send?to={planet.name}"
				on:mouseover|preventDefault={(event) => LineMouseOver(event, i)}
				on:mousemove|preventDefault={(event) => LineMouseMove(event)}
				on:mouseout|preventDefault={() => LineMouseOut()}
			>
				<line
					x1={planet.displayX}
					y1={planet.displayY}
					x2={currDisplay.displayX}
					y2={currDisplay.displayY}
					stroke="currentColor"
					stroke-width="10"
				/>
			</a>
		{/if}
	{/each}
	{#each calc as planet, i}
		{#if planet.name === $profile}
			<circle
				class="planet"
				cx={planet.displayX}
				cy={planet.displayY}
				r={scaleDiam(planet.diameter)}
				fill={planet.color}
			/>
			<text
				x={planet.displayX}
				y={planet.displayY + scaleDiam(planet.diameter) + 18}
				text-anchor="middle"
				fill="white"
			>
				{planet.name}
			</text>
		{:else}
			<a
				href="/send?to={planet.name}"
				on:mouseover|preventDefault={(event) => LineMouseOver(event, i)}
				on:mousemove|preventDefault={(event) => LineMouseMove(event)}
				on:mouseout|preventDefault={() => LineMouseOut()}
			>
				<circle
					class="planet"
					cx={planet.displayX}
					cy={planet.displayY}
					r={scaleDiam(planet.diameter)}
					fill={planet.color}
					tabindex="0"
					role="button"
					on:mouseover|preventDefault={(event) => LineMouseOver(event, i)}
					on:mousemove|preventDefault={(event) => LineMouseMove(event)}
					on:mouseout|preventDefault={() => LineMouseOut()}
					on:mouseup|preventDefault={() => LineMouseUp(i)}
				/>
			</a>
			<text
				x={planet.displayX}
				y={planet.displayY + scaleDiam(planet.diameter) + 18}
				text-anchor="middle"
			>
				{planet.name}
			</text>
		{/if}
	{/each}
</svg>

{#if popupVisible}
	<div class="popup" style="left: {popupX}px; top: {popupY}px;">
		<h3>{calc[popupIndex].name}</h3>
		<p>
			message time from {data.planets[$profile].name}:
			<code>{formatSecs(calc[popupIndex].currTime)}</code>
		</p>
		<p>
			distance from {data.planets[$profile].name}:
			<code> {formatAU(calc[popupIndex].currDist)} AU</code>
		</p>
		<p>distance from sun: <code>{formatAU(calc[popupIndex].sunDist)} AU</code></p>
	</div>
{/if}

<style>
	svg {
		width: 100%;
		height: 100%;
	}
	.orbit {
		color: var(--bg-3);
		z-index: -1;
	}
	text {
		font-weight: 300;
		font-size: 1rem;
		fill: var(--fg);
	}
	text:hover {
		cursor: default;
	}
	.planet:hover {
		cursor: pointer;
		filter: brightness(1.3);
	}
	line {
		color: color-mix(in srgb, var(--fg), transparent 85%);
		transition: color 0.1s;
	}
	line:hover {
		cursor: pointer;
		color: color-mix(in srgb, var(--fg), transparent 50%);
	}
	.popup {
		position: fixed;
		background-color: var(--bg-2);
		border: 2px solid var(--bg-3);
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
