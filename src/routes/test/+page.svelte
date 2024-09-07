<div class="content">
    <br>
    <div class="quick-send">
        <a href="/test/send">Send a message ➤</a>
    </div>
    <br>
    <div class="row">
        <div class="swappable">
            <p>Recent Incoming | Recent Outgoing<p>
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



<style>
    .content{
        padding: 1.5rem;
    }
    .quick-send{
        padding: 1rem;
        text-align: center;
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