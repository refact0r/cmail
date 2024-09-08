<script>
	import { profile } from '$lib/stores/profile.js';
	import { dist, scaleDiam } from '$lib/js/planets.js';
	import { formatAU, formatSecs, hexToHSL, darken } from '$lib/js/utils.js';
	import * as constants from '$lib/js/constants.js';
	import { afterUpdate } from 'svelte';
	import { enhance } from '$app/forms';
	import IconSend from 'phosphor-svelte/lib/PaperPlaneRight';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';

	export let data;

	let destination = $page.url.searchParams.get('to') ?? 'earth';
	let distance_km;
	let distance_au;
	let delay;
	let delay_sec;

	distance_km = dist(data.planets[$profile], data.planets[destination]);
	distance_au = formatAU(distance_km);
	delay_sec = (distance_km / constants.c) * 1000;
	delay = formatSecs(delay_sec);

	function updateVals() {
		distance_km = dist(data.planets[$profile], data.planets[destination]);
		distance_au = formatAU(distance_km);
		delay_sec = (distance_km / constants.c) * 1000;
		delay = formatSecs(delay_sec);
	}
</script>

<div class="page">
	<h1>Send</h1>
	<div class="form-box">
		<form
			method="POST"
			use:enhance={({ formData }) => {
				formData.append('delay', delay_sec);
				toast.push('Message Sent!');
			}}
		>
			<div class="row">
				<div class="half">
					<svg viewBox="0 0 2000 1000">
						<line
							x1="300"
							y1="500"
							x2="1700"
							y2="500"
							stroke="currentColor"
							stroke-width="10"
							stroke-dasharray="35,30"
						/>
						<text x="1000" y="400" text-anchor="middle" fill="white" font-size="3.5rem"
							>Calculated Distance: {distance_au} AU</text
						>
						<text x="1000" y="650" text-anchor="middle" fill="white" font-size="3.5rem"
							>Calculated Delay: {delay}</text
						>

						<!--Planet Start-->
						<circle
							cx={300}
							cy={500}
							r={scaleDiam(data.planets[$profile].diameter) * 10}
							fill={darken(
								hexToHSL(data.planets[$profile].color)[0],
								hexToHSL(data.planets[$profile].color)[1],
								hexToHSL(data.planets[$profile].color)[2],
								20
							)}
						/>
						<circle
							cx={300 - scaleDiam(data.planets[$profile].diameter) / 1.5}
							cy={500 - scaleDiam(data.planets[$profile].diameter) / 1.5}
							r={scaleDiam(data.planets[$profile].diameter) * 8.5}
							fill={darken(
								hexToHSL(data.planets[$profile].color)[0],
								hexToHSL(data.planets[$profile].color)[1],
								hexToHSL(data.planets[$profile].color)[2],
								10
							)}
						/>
						<circle
							cx={300 - scaleDiam(data.planets[$profile].diameter) * 1.5}
							cy={500 - scaleDiam(data.planets[$profile].diameter) * 1.5}
							r={scaleDiam(data.planets[$profile].diameter) * 6.5}
							fill={data.planets[$profile].color}
						/>

						<!--Planet Destination-->
						<circle
							cx={1700}
							cy={500}
							r={scaleDiam(data.planets[destination].diameter) * 10}
							fill={darken(
								hexToHSL(data.planets[destination].color)[0],
								hexToHSL(data.planets[destination].color)[1],
								hexToHSL(data.planets[destination].color)[2],
								20
							)}
						/>
						<circle
							cx={1700 - scaleDiam(data.planets[destination].diameter) / 1.5}
							cy={500 - scaleDiam(data.planets[destination].diameter) / 1.5}
							r={scaleDiam(data.planets[destination].diameter) * 8.5}
							fill={darken(
								hexToHSL(data.planets[destination].color)[0],
								hexToHSL(data.planets[destination].color)[1],
								hexToHSL(data.planets[destination].color)[2],
								10
							)}
						/>
						<circle
							cx={1700 - scaleDiam(data.planets[destination].diameter) * 1.5}
							cy={500 - scaleDiam(data.planets[destination].diameter) * 1.5}
							r={scaleDiam(data.planets[destination].diameter) * 6.5}
							fill={data.planets[destination].color}
						/>
					</svg>
				</div>
				<div class="half fill">
					<div class="row">
						<div class="group">
							<label for="profile">Profile: </label>
							<br />
							<select
								name="profile"
								id="profile"
								title="Start"
								bind:value={$profile}
								on:change|preventDefault={() => updateVals()}
							>
								{#each Object.keys(data.planets) as planet}
									<option value={planet}>{planet}</option>
								{/each}
							</select>
						</div>
						<div class="group">
							<label for="destination">Destination</label>
							<br />
							<select
								name="destination"
								id="destination"
								title="Destination"
								bind:value={destination}
								on:change|preventDefault={() => updateVals()}
							>
								{#each Object.keys(data.planets) as planet}
									<option value={planet}>{planet}</option>
								{/each}
							</select>
						</div>
						<button type="submit" title="Send"><IconSend /></button>
					</div>
					<br />
					<div class="group">
						<label for="message">Message</label>
						<br />
						<textarea name="message" id="message" maxlength="400" required></textarea>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	h1 {
		font-family: 'Orbitron', sans-serif;
		text-align: center;
	}
	.form-box {
		padding: 1rem 8rem;
	}
	form {
		padding: 4rem;
		/*background: var(--bg-3);*/
		border-radius: 1rem;
	}
	.row {
		display: flex;
		gap: 2rem;
	}
	.half {
		flex: 50%;
	}
	select {
		border: 2px solid var(--bg-2);
		padding: 0.5rem 0.75rem;
		border-radius: 1rem;
		background-color: var(--bg);
		font: inherit;
		color: inherit;
		transition: 0.1s;
		margin-top: 0.5rem;
	}
	select:hover {
		cursor: pointer;
		background-color: var(--fg);
		color: var(--bg);
	}
	.fill {
		background-color: var(--bg-2);
        border: 2px solid var(--bg-3);
		padding: 2rem;
		border-radius: 1rem;
	}
	textarea {
		width: 100%;
		resize: none;
		height: 24vh;
		background: var(--bg);
		color: var(--fg);
		transition: 0.3s;
		border-radius: 1rem;
		border: 2px solid var(--fg-3);
		margin-top: 1rem;
		padding: 1rem;
	}
	textarea:hover {
		background: var(--fg);
		color: var(--bg);
	}
	button[type='submit'] {
		color: var(--fg);
		background-color: var(--bg);
		font-size: 2rem;
		border: var(--fg-3) 0.1rem solid;
		font-size: 1.5rem;
		text-decoration: none;
		border-radius: 4rem;
		transition: 0.3s;
		height: 3rem;
		width: 3rem;
		margin-top: 1vh;
		margin-left: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	button[type='submit']:hover {
		color: var(--bg);
		background: var(--fg);
		border: var(--bg) 0.1rem solid;
	}
	.r {
		align-items: right;
		align-self: right;
		align-content: right;
		flex: 5%;
	}
	.vh {
		flex: 25%;
	}
</style>
