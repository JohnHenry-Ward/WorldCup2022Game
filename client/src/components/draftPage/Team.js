/* Libraries */
import React from "react";

/* Other Components */

/* Internal Requirements */
// import '../../css/leaguePage/groups.css';
const teamCodes = require('../../js/convert').teamCodes;
const FIFArank = require('../../js/odds').FIFArank;
const odds = require('../../js/odds').odds;

const Team = ({ team, draftedTeams }) => {
    const teamCode = teamCodes[team.team.name];

    let tooltip = 'FIFA Rank: ' + FIFArank[team.team.name] + '\n' + 'Odds: ' + odds[team.team.name];

    return (
            <tr className="team-selectable" data-team={team.team.name} data-ignore='true' title={tooltip}>
                <td className="left-round-draft" data-ignore='true'>
                    <img src={require("../../images/flags/"+teamCode+".png")} className="team-flag" data-ignore='true' alt={teamCode+' flag'} />
                </td>
                <td className="team-name-td-draft" data-ignore='true'>
                    <p className="team-name" data-ignore='true'>{team.team.name}</p>
                </td>
                <td className="right-round-draft" data-ignore='true'>
                    <div className="player-circle" id="player-circle-p8" data-ignore='true'></div>
                </td>
            </tr>
    );
}

export default Team;