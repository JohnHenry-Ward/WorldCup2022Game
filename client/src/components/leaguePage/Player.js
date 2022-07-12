/* Libraries */
import React from "react";

/* Internal Requirements */
import '../../css/leaguePage/standings.css';

const Player = ({player, place}) => {

    const placeLookup = {
        1: '1st',
        2: '2nd',
        3: '3rd', 
        4: '4th',
        5: '5th',
        6: '6th',
        7: '7th',
        8: '8th'
    }

    return (
        <tr className="player" id={'player-' + player.playerNumber}>
            <td className="player-position left-round">{placeLookup[place]}</td>
            <td>
                <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
            </td>
            <td className="player-username">{player.playerName}</td>
            <td>
                <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
            </td>
            <td className="player-points right-round">{player.score}</td> 
        </tr>
    );
}

export default Player;