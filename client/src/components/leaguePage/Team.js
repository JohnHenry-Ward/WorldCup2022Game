/* Libraries */
import React from "react";

/* Other Components */

/* Internal Requirements */
import '../../css/leaguePage/groups.css';
const teamCodes = require('../../config/convert').teamCodes;

const Team = ({ team, players }) => {
    const teamCode = teamCodes[team.team.name];
    const teamToPlayer = {};

    players.forEach(p => {
        p.teamsID.forEach(t => {
            teamToPlayer[t] = p.playerNumber;
        });
    });

    const playerNum = teamToPlayer[teamCode] !== undefined ? teamToPlayer[teamCode] : 8;

    return (
            <tr>
                <td className="left-round">
                    <div className="player-circle" id={"player-circle-p"+playerNum}></div>
                </td>
                <td>
                <img src={require("../../images/flags/"+teamCode+".png")} className="team-flag" alt={teamCode+' flag'} />
                </td>
                <td>
                    <p className="team-name">{team.team.name}</p>
                </td>
                <td>
                    <p className="team-wins">{team.all.win}</p>
                </td>
                <td>
                    <p className="team-ties">{team.all.draw}</p>
                </td>
                <td>
                    <p className="team-losses">{team.all.lose}</p>
                </td>
                <td className="right-round">
                    <p className="team-points">{team.points}</p>
                </td>
            </tr>
        
    );
}

export default Team;