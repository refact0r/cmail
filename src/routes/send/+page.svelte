<script>
	import { profile } from '$lib/stores/profile.js';
	import { dist, scaleDiam } from '$lib/js/planets.js';
	import { formatAU, formatSecs, hexToHSL, darken } from '$lib/js/utils.js';
	import * as constants from '$lib/js/constants.js';
	import { enhance } from '$app/forms';
	import IconSend from 'phosphor-svelte/lib/PaperPlaneRight';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import { convertPlanet } from '$lib/js/planets.js';

	export let data;

	let destination = $page.url.searchParams.get('to') ?? 'earth';

	$: curr = convertPlanet(data.planets[$profile], new Date());
	$: dest = convertPlanet(data.planets[destination], new Date());

	$: distance_km = dist(curr, dest);
	$: distance_au = formatAU(distance_km);
	$: delay_sec = (distance_km / constants.c) * 1000;
	$: delay = formatSecs(delay_sec);
</script>

<div class="page">
	<h1>send</h1>
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
							r={scaleDiam(curr.diameter) * 10}
							fill={darken(
								hexToHSL(curr.color)[0],
								hexToHSL(curr.color)[1],
								hexToHSL(curr.color)[2],
								20
							)}
						/>
						<circle
							cx={300 - scaleDiam(curr.diameter) / 1.5}
							cy={500 - scaleDiam(curr.diameter) / 1.5}
							r={scaleDiam(curr.diameter) * 8.5}
							fill={darken(
								hexToHSL(curr.color)[0],
								hexToHSL(curr.color)[1],
								hexToHSL(curr.color)[2],
								10
							)}
						/>
						<circle
							cx={300 - scaleDiam(curr.diameter) * 1.5}
							cy={500 - scaleDiam(curr.diameter) * 1.5}
							r={scaleDiam(curr.diameter) * 6.5}
							fill={curr.color}
						/>

						<!--Planet Destination-->
						<circle
							cx={1700}
							cy={500}
							r={scaleDiam(dest.diameter) * 10}
							fill={darken(
								hexToHSL(dest.color)[0],
								hexToHSL(dest.color)[1],
								hexToHSL(dest.color)[2],
								20
							)}
						/>
						<circle
							cx={1700 - scaleDiam(dest.diameter) / 1.5}
							cy={500 - scaleDiam(dest.diameter) / 1.5}
							r={scaleDiam(dest.diameter) * 8.5}
							fill={darken(
								hexToHSL(dest.color)[0],
								hexToHSL(dest.color)[1],
								hexToHSL(dest.color)[2],
								10
							)}
						/>
						<circle
							cx={1700 - scaleDiam(dest.diameter) * 1.5}
							cy={500 - scaleDiam(dest.diameter) * 1.5}
							r={scaleDiam(dest.diameter) * 6.5}
							fill={dest.color}
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
						<textarea class="box2" name="message" id="message" maxlength="400" required></textarea>
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
		border: 2px solid var(--bg-4);
		padding: 0.5rem 0.75rem;
		border-radius: 1rem;
		background-color: var(--bg-3);
		font: inherit;
		color: inherit;
		transition: 0.1s;
		margin-top: 0.5rem;
	}
	select:hover {
		cursor: pointer;
		background-color: var(--bg-4);
		border-color: var(--bg-5);
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
		color: var(--fg);
		transition: 0.3s;
		border-radius: 1rem;
		margin-top: 1rem;
		padding: 1rem;
	}
	textarea:hover {
		background: var(--bg-4);
		border-color: var(--bg-5);
	}
	button[type='submit'] {
		color: var(--fg);
		background-color: var(--bg-3);
		font-size: 2rem;
		border: var(--bg-4) 2px solid;
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
		pointer: cursor;
		background: var(--bg-4);
		border: var(--bg-5) 2px solid;
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
