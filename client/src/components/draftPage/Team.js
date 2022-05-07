/* Libraries */
import React from "react";

/* Other Components */

/* Internal Requirements */
// import '../../css/leaguePage/groups.css';
const teamCodes = require('../../config/teamCodes').teamCodes;

const Team = ({ team }) => {
    const teamCode = teamCodes[team.team.name];
    const teamToPlayer = {};

    // players.forEach(p => {
    //     p.teamsID.forEach(t => {
    //         teamToPlayer[t] = p.playerNumber;
    //     });
    // });

    // const playerNum = teamToPlayer[teamCode];

    return (
            <tr className="team-selectable" data-team={team.team.name}>
                <td className="left-round">
                    <img src={require("../../images/flags/"+teamCode+".png")} className="team-flag" alt={teamCode+' flag'} />
                </td>
                <td className="team-name-td">
                    <p className="team-name">{team.team.name}</p>
                </td>
                <td className="right-round">
                    <div className="player-circle" id="player-circle-p9"></div>
                </td>
            </tr>
    );
}

export default Team;