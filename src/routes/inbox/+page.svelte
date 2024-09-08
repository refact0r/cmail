<script>
    import '../../app.css';

    let select = 'incoming';
</script>

<div class="page">
    <h1>Inbox</h1>
    <div class="objects">
        <div class="setting">
            <button class:selected={select==="incoming"} id="incoming" on:click={() => (select = 'incoming')}>Incoming</button>
            <br>
            <button class:selected={select==="outgoing"} id="outgoing" on:click={() => (select = 'outgoing')}>Outgoing</button>
        </div>
        <div class="messages">
            {#if select === 'incoming'}
                <div class="message">
                    <p><b>[ By: Mars | 02:25 AM | 09/08/2025 ]</b><!--{Message Content}--> Hello Earthlings!</p>
                </div>
            {:else}
                <div class="message">
                    <p><b>[ To: Mars | 02:53 AM | 09/08/2025 | ETA 12min ]</b><!--{Message Content}--> What's up Martians!</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    h1 {
        font-family: 'Orbitron', sans-serif;
        text-align: center;
    }
    .objects{
        padding: 0rem 4rem;
        display: flex;
        gap: 1rem;
    }
    .setting{
        flex: 15%;
        border-radius: 1rem;
        padding: 0rem 1rem;
    }
    .messages{
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
        border-right: .2rem solid var(--bg-3);
        border-bottom: none;
        border-radius: 1rem 1rem 0rem 0rem;
    }
    #outgoing {
        border-bottom: .2rem solid var(--bg-3);
        border-left: .2rem solid var(--bg-3);
        border-right: .2rem solid var(--bg-3);
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