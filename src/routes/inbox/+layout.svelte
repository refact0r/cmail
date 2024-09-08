<script>
	import { profile } from '$lib/stores/profile.js';
	import { messagesRead } from '$lib/stores/messagesRead.js';
	import { filterMessages } from '$lib/js/messages.js';
	import { formatDate, formatTime } from '$lib/js/utils.js';
	import { fade } from 'svelte/transition';

	export let data;

	$: console.log($messagesRead);

	$: messages = filterMessages(data.messages, $profile, $messagesRead);

	$: outgoingMessages = data.messages
		.filter((message) => message.from === $profile)
		.filter((message) => new Date(message.arrives_at) > new Date())
		.sort((a, b) => b.created_at - a.created_at)
		.splice(0, 5)
		.map((message) => {
			return {
				...message
			};
		});

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
				<div class="menu">
					<button
						class:selected={select === 'incoming'}
						id="incoming"
						on:click={() => (select = 'incoming')}>Incoming</button
					>
					<button
						class:selected={select === 'outgoing'}
						id="outgoing"
						on:click={() => (select = 'outgoing')}>Outgoing</button
					>		
				</div>
				<div class="messages">
					{#if select === 'incoming'}
						{#each messages as message}
							<a class="message box2" href="/inbox/{message.id}">
								<div class="content-container">
									<p class="content">{message.content}</p>
									{#if !$messagesRead.includes(String(message.id))}
										<div class="new">•</div>
									{/if}
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
					{:else}
						{#each outgoingMessages as message}
							<a class="message box2" href="/inbox/{message.id}">
								<div class="content-container">
									<p class="content">{message.content}</p>
									{#if !$messagesRead.includes(String(message.id))}
										<div class="new">•</div>
									{/if}
								</div>
								<p class="details">
									<span class="from">{message.to}</span>
									<span class="separator">•</span>
									<span class="date">{formatDate(message.created_at)}</span>
									<span class="separator">•</span>
									<span class="time">{formatTime(message.created_at)}</span>
								</p>
							</a>
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="side2">
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
	.side2 {
		display: grid;
		width: 100%;
	}
	.content {
		display: flex;
		width: 100%;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	.messages {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.menu{
		display: flex;
		padding-bottom: 1rem;
	}

	button {
        font-family: 'Dm Sans', sans-serif;
        font-size: 1rem;
        background: var(--bg);
        color: var(--fg);   
        text-decoration: none;
        text-align: left;
        padding: 1rem .5rem;
        width: 100%;
        transition: .3s;
    }
    button:hover {
        background: var(--bg-2);
        cursor: pointer;
    }
    #incoming {
        border-top: .2rem solid var(--bg-3);
        border-left: .2rem solid var(--bg-3);
        border-bottom: .2rem solid var(--bg-3);
        border-right: none;
        border-radius: 1rem 0rem 0rem 1rem;
    }
    #outgoing {
        border-bottom: .2rem solid var(--bg-3);
        border-top: .2rem solid var(--bg-3);
        border-right: .2rem solid var(--bg-3);
        border-left: none;
        border-radius: 0rem 1rem 1rem 0rem;
    }
    .selected {
        background-color: var(--bg-3);
    }

</style>
