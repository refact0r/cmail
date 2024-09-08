<script>
	import { profile } from '$lib/stores/profile.js';
	import { messagesRead } from '$lib/stores/messagesRead.js';
	import { filterMessages } from '$lib/js/messages.js';
	import { formatDate, formatTime } from '$lib/js/utils.js';
    import { fade } from 'svelte/transition';

	export let data;

	$: messages = filterMessages(data.messages, $profile, $messagesRead);
    $: console.log(data.pathname);
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
		<div class="side">
			<div class="box">
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
		<div class="side">
            {#key data.pathname}
                <div class="content" in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
                    <slot />
                </div>
            {/key}
		</div>
	</div>
</div>

<style>
	h1 {
		font-family: 'Orbitron', sans-serif;
		text-align: center;
	}
	.page {
		display: flex;
		flex-direction: column;
	}
	.container {
		display: flex;
		gap: 1rem;
		flex: 1;
	}
	.side {
		width: 100%;
		display: flex;
		padding: 0;
	}
	.side .box {
		width: 100%;
	}
	.messages {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
