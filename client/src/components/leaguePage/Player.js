/* Libraries */
import React from "react";

/* Internal Requirements */
import '../../css/leaguePage/standings.css';

const Player = ({player}) => {

    //position and points will be dynamically calculated
    
    return (
        <tr className="player" id={'player-' + player.playerNumber}>
            <td className="player-position left-round">1st</td>
            <td>
                <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
            </td>
            <td className="player-username">{player.playerName}</td>
            <td>
                <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
            </td>
            <td className="player-points right-round">31</td> 
        </tr>
    );
}

export default Player;