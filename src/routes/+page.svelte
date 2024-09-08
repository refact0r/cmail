<script>
	import SolarSystem from '$lib/components/SolarSystem.svelte';
	import { formatDate, formatTime } from '$lib/js/utils.js';
	import { profile } from '$lib/stores/profile.js';
	import { messagesRead } from '$lib/stores/messagesRead.js';
	import { filterMessages } from '$lib/js/messages.js';

	export let data;

	$: messages = filterMessages(data.messages, $profile, $messagesRead);

	$: outgoingMessages = data.messages
		.filter((message) => message.from === $profile)
		.filter((message) => new Date(message.arrives_at) > new Date())
		.sort((a, b) => b.created_at - a.created_at)
		.splice(0, 6)
		.map((message) => {
			return {
				...message
			};
		});
</script>

<div class="page">
	<div class="side">
		<div class="new box">
			<h2>New</h2>
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
	</div>
	<div class="system">
		<SolarSystem {data} />
	</div>
	<div class="side">
		<div class="outgoing box">
			<h2>Outgoing</h2>
			<div class="messages">
				{#each outgoingMessages as message}
					<a class="message box2" href="/inbox/{message.id}">
						<div class="content-container">
							<p class="content">{message.content}</p>
						</div>
						<p class="details">
							<span class="to">{message.to}</span>
							<span class="separator">•</span>
							<span class="date">{formatDate(message.arrives_at)}</span>
							<span class="separator">•</span>
							<span class="time">{formatTime(message.arrives_at)}</span>
						</p>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		margin-top: 0rem;
	}
	.side {
		width: 25%;
		display: flex;
		align-items: center;
	}
	.side .box {
		width: 100%;
	}
	.box h2 {
		margin: 0 0 1rem 0;
	}
	.system {
		width: 50%;
		display: flex;
		padding: 0 2rem;
	}
	.messages {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
