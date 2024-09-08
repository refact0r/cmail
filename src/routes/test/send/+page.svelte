<script>
    import { profile } from '$lib/stores/profile.js';

    let destination = 'earth';
    let distance = 0;
    let delay = 0;

    function sendMessage() {

    }
</script>

<h1>Send</h1>
<div class="form-box">
    <form on:submit|preventDefault={() => sendMessage()}>
        <div class="row">
            <div class="group">
                <label for="profile">Profile: </label>
                <br>
				<select name="profile" id="profile" title="Select planet" bind:value={$profile}>
					<option value="mercury" title="Mercury">Mercury</option>
					<option value="venus" title="Venus">Venus</option>
					<option value="earth" title="Earth">Earth</option>
					<option value="moon" title="Moon">Moon</option>
					<option value="mars" title="Mars">Mars</option>
					<option value="jupiter" title="Jupiter">Jupiter</option>
					<option value="saturn" title="Saturn">Saturn</option>
					<option value="uranus" title="Uranus">Uranus</option>
					<option value="neptune" title="Neptune">Neptune</option>
					<option value="pluto" title="Pluto">Pluto</option>
					</select>
            </div>
            <div class="group">
                <label for="destination">Destination</label>
                <br />
                <select name="destination" id="destination" title="Destination" bind:value={destination}>
                    <option value="mercury" title="Mercury">Mercury</option>
                    <option value="venus" title="Venus">Venus</option>
                    <option value="earth" title="Earth">Earth</option>
                    <option value="moon" title="Moon">Moon</option>
                    <option value="mars" title="Mars">Mars</option>
                    <option value="jupiter" title="Jupiter">Jupiter</option>
                    <option value="saturn" title="Saturn">Saturn</option>
                    <option value="uranus" title="Uranus">Uranus</option>
                    <option value="neptune" title="Neptune">Neptune</option>
                    <option value="pluto" title="Pluto">Pluto</option>
                </select>
            </div>
            <div class="group">
                <label for="distance">Distance</label>
                <br>
                <input type="text" id="distance" name="distance" title="Distance" bind:value={distance} readonly> AU    
            </div>
            <div class="group">
                <label for="delay">Delay</label>
                <br>
                <input type="text" id="delay" name="delay" title="Delay" bind:value={delay} readonly> seconds
            </div>
        </div>
        
    </form>
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
        background: var(--bg-3);
    }
    .row {
        display: flex;
        gap: 2rem;
    }
    select{
		border-radius: .2rem;
		outline: none;
		font-family: 'Orbitron', sans-serif;
		background-color: var(--bg);
		color: var(--fg);
		width: 8vw;
		transition: .3s;
	}
	select:hover{
		background-color: var(--fg);
		color: var(--bg);
	}
</style>