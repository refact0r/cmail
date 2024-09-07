<div class="logo">
    <h1>Placeholder</h1>
</div>
<div class="navbar">
    <a class="selected" href="/test">‎ Home ‎</a>
    <a href="/test/communicate">‎ Communicate ‎</a>
    <a href="/test/about">‎ About ‎</a>
</div>
<div class="content">
    <div class="server-select">
        <label for="server">Server: </label>
        <select name="server" id="server">
            <option value="earth">Earth</option>
            <option value="moon">Moon</option>
            <option value="mars">Mars</option>
          </select>
    </div>
    <br>
    <div class="row">
        <div class="swappable">
            <p>Incoming | Outgoing<p>
        </div>
        <div class="panel">
            <p>Guide</p>
            <table>
                <tr>
                    <th>Planet</th>
                    <th>Distance from Earth</th>
                    <th>Message ETA</th>
                </tr>
                <tr>
                    <td>Mercury</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Venus</td>
                    <td></td>
                    <td></td>
                </tr>
    
            </table>
        </div>
    </div>
</div>



<style lang="scss">

    .logo{
        text-align: center;
    }
    a {
        color: white;
        text-decoration: none;
    }
    .navbar{
        text-align: center;
        
    }
    .server-select{
        text-align: center;
    }
    .selected{
        color: black;
        background-color: white;
    }
    .content{
        padding: 1.5rem;
    }
    .row{
        display: flex;
    }
    .swappable{
        flex: 75%;
        font-size: 1.5rem;
        padding: 0rem 1rem;
        background-color: hsla(0, 0%, 100%, 0.25);
    }
    .panel{
        flex: 25%;
        font-size: 1.5rem;
        text-align: center;
        padding: 0rem 0rem 0rem 1rem;
    }
    table, th, td{
        font-size: 1.2rem;
        border: solid 2px;
        border-collapse: collapse;
        color:white;
    }
    table {
        width: 100%;
    }
    th, td{
        padding: .4vh;
    }
</style>