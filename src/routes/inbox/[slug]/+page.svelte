<script>
	import { formatDate, formatTime } from '$lib/js/utils.js';
	import { tick } from 'svelte';
	import { messagesRead } from '$lib/stores/messagesRead.js';

	export let data;

	$: message = data.messages.find((msg) => String(msg.id) === String(data.id));

	$: if (data && data.id && !$messagesRead.includes(data.id)) {
		updateMessagesRead();
	}
	async function updateMessagesRead() {
		$messagesRead.push(data.id);
		$messagesRead = $messagesRead;
		await tick();
	}
</script>

<div class="container box">
	<h2>message</h2>
	<p>from: <code>{message.from}</code></p>
	<p>to: <code>{message.to}</code></p>
	<p>sent: <code>{formatDate(message.created_at)} {formatTime(message.created_at)}</code></p>
	<p>arrives: <code>{formatDate(message.arrives_at)} {formatTime(message.arrives_at)}</code></p>
	<br />
	<p>
		{message.content}
	</p>
</div>

<style>
	h2 {
		margin-top: 0;
	}
	.container {
		flex: 1;
	}
</style>
