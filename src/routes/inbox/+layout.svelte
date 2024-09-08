<script>
	import { profile } from '$lib/stores/profile.js';
	import { messagesRead } from '$lib/stores/messagesRead.js';

	export let data;

	$: messages = filteredMessages(data.messages, $profile, $messagesRead);

	let select = 'incoming';
</script>

<div class="page">
	<h1>inbox</h1>
	<div class="container">
		<!-- <div class="setting">
			<button
				class:selected={select === 'incoming'}
				id="incoming"
				on:click={() => (select = 'incoming')}>Incoming</button
			>
			<br />
			<button
				class:selected={select === 'outgoing'}
				id="outgoing"
				on:click={() => (select = 'outgoing')}>Outgoing</button
			>
		</div> -->
		<div class="messages">
			{#each messages as message}
				<a class="message" href="/inbox/{message.id}"></a>
			{/each}
		</div>
		<slot />
	</div>
</div>

<style>
	h1 {
		font-family: 'Orbitron', sans-serif;
		text-align: center;
	}
	.container {
		padding: 0rem 4rem;
		display: flex;
		gap: 1rem;
	}
	.setting {
		flex: 15%;
		border-radius: 1rem;
		padding: 0rem 1rem;
	}
	.messages {
		flex: 85%;
		min-height: 50vh;
		background-color: var(--bg-3);
		border-radius: 1rem;
		padding: 1rem;
	}
	button {
		font-family: 'Dm Sans', sans-serif;
		font-size: 1rem;
		background: var(--bg);
		color: var(--fg);
		text-decoration: none;
		text-align: left;
		padding: 1rem 0.5rem;
		width: 100%;
		transition: 0.3s;
	}
	button:hover {
		background: var(--bg-2);
		cursor: pointer;
	}
	#incoming {
		border-top: 0.2rem solid var(--bg-3);
		border-left: 0.2rem solid var(--bg-3);
		border-right: 0.2rem solid var(--bg-3);
		border-bottom: none;
		border-radius: 1rem 1rem 0rem 0rem;
	}
	#outgoing {
		border-bottom: 0.2rem solid var(--bg-3);
		border-left: 0.2rem solid var(--bg-3);
		border-right: 0.2rem solid var(--bg-3);
		border-top: none;
		border-radius: 0rem 0rem 1rem 1rem;
	}
	.selected {
		background-color: var(--bg-3);
	}
	.message {
		background-color: hsla(0, 0%, 100%, 0.2);
		border-radius: 1rem;
		padding: 0.5rem 1rem;
	}
</style>
