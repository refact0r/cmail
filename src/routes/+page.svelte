<script>
	import SolarSystem from '$lib/components/SolarSystem.svelte';
	import { formatDate, formatTime } from '$lib/js/utils.js';
	import { profile } from '$lib/stores/profile.js';
	import { messagesRead } from '$lib/stores/messagesRead.js';

	export let data;

	$: newMessages = data.messages
		.filter((message) => message.to === $profile)
		.filter((message) => !$messagesRead.includes(message.id))
		.sort((a, b) => b.created_at - a.created_at)
		.splice(0, 6)
		.map((message) => {
			return {
				...message,
				read: false
			};
		});
	$: oldMessages = data.messages
		.filter((message) => message.to !== $profile)
		.filter((message) => $messagesRead.includes(message.id))
		.sort((a, b) => b.created_at - a.created_at)
		.splice(0, 6 - newMessages.length)
		.map((message) => {
			return {
				...message,
				read: true
			};
		});
	$: messages = [...newMessages, ...oldMessages];
</script>

<div class="page">
	<div class="side">
		<div class="new box">
			<h2>New</h2>
			<div class="messages">
				{#each newMessages as message}
					<a class="message" href="/inbox/{message.id}">
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
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		margin-top: 0rem;
	}
	.side {
		width: 27%;
		display: flex;
		align-items: center;
		padding: 2rem;
	}
	.box {
		background: var(--bg-2);
		border-radius: 1rem;
		border: 2px solid var(--bg-3);
		padding: 1rem;
		width: 100%;
	}
	.box h2 {
		margin: 0 0 1rem 0;
	}
	.system {
		width: 46%;
		display: flex;
	}
	.messages {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.message {
		background-color: var(--bg-3);
		border-radius: 0.75rem;
		padding: 0.75rem;
		border: 2px solid var(--bg-4);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		text-decoration: none;
		transition: 0.1s;
	}
	.message:hover {
		background-color: var(--bg-4);
		border-color: var(--bg-5);
	}
	.message p {
		margin: 0;
	}
	.new {
		color: var(--fg-0);
	}
	.content {
		color: var(--fg);
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.content-container {
		display: flex;
		justify-content: space-between;
	}
	.details {
		color: var(--fg-3);
		font-size: 0.875rem;
	}
</style>
