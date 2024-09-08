<script>
	import { profile } from '$lib/stores/profile.js';
	import { messagesRead } from '$lib/stores/messagesRead.js';
	import { filterMessages } from '$lib/js/messages.js';
	import { formatDate, formatTime } from '$lib/js/utils.js';

	export let data;

	$: messages = filterMessages(data.messages, $profile, $messagesRead);

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
		<div class="side box">
			<div class="messages">
				{#each messages as message}
					<a class="message box2" href="/inbox/{message.id}">
						<div class="content-container">
							<p class="content">{message.content}</p>
							<div class="new">•</div>
						</div>
						<p class="details">
							<span class="from">{message.from}</span>
							<span class="separator">•</span>
							<span class="date">{formatDate(message.created_at)}</span>
							<span class="separator">•</span>
							<span class="time">{formatTime(message.created_at)}</span>
						</p>
					</a>
				{/each}
			</div>
		</div>
		<div class="side">
			<slot />
		</div>
	</div>
</div>

<style>
	h1 {
		font-family: 'Orbitron', sans-serif;
		text-align: center;
	}
	.container {
		display: flex;
		gap: 2rem;
	}
	.side {
		width: 50%;
	}
	.messages {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
