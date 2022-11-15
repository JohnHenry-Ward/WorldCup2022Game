/* Libraries */
import React from "react";

/* Other Components */

/* Internal Requirements */
import '../../css/leaguePage/schedule.css';
const teamCodes = require('../../js/convert').teamCodes;

const Fixture = ({ game, players, groups, gameNumber }) => {
    const homeTeamCode = teamCodes[game.teams.home.name];
    const awayTeamCode = teamCodes[game.teams.away.name];
    const status = game.fixture.status.short;

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const d = new Date(game.fixture.date);
    const date = months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.toLocaleTimeString([], {timeStyle: 'short'});

    const teamToPlayer = {};

    players.forEach(p => {
        p.teamsID.forEach(t => {
            teamToPlayer[t] = p.playerNumber;
        });
    });

    const playerHome = teamToPlayer[homeTeamCode] !== undefined ? teamToPlayer[homeTeamCode] : 8;
    const playerAway = teamToPlayer[awayTeamCode] !== undefined ? teamToPlayer[awayTeamCode] : 8;

    return (
        <div className="fixture-wrapper">
            <div className="fixture" title={'Game ' + gameNumber}>
                <div className="team" id="home">
                    <div className="player-circle" id={"player-circle-p"+playerHome}></div>
                    <p className="team-name">{game.teams.home.name}</p>
                    <img className="team-flag" src={require("../../images/flags/"+homeTeamCode+".png")} alt={homeTeamCode+' flag'} />
                </div>
                <div className="score">
                    <p id="home">{game.goals.home || 0}</p>
                    <p>-</p>
                    <p id="away">{game.goals.away || 0}</p>
                </div>
                <div className="team" id="away">
                    <img className="team-flag" src={require("../../images/flags/"+awayTeamCode+".png")} alt={awayTeamCode+' flag'} />
                    <p className="team-name">{game.teams.away.name}</p>
                    <div className="player-circle" id={"player-circle-p"+playerAway}></div>
                </div>
            </div>
            <div className="gameStatus">
                <p className={`text ${["1H", "2H", "HT", "2H", "ET", "P"].includes(status) ? "live" : ""}`}>
                    {
                        status === 'NS' ?
                        date
                        :
                        status === 'PEN' ?
                        'Full Time (' + game.score.penalty.home + '-' + game.score.penalty.away + ')'
                        :
                        status === '1H' ?
                        "First Half"
                        :
                        status === 'HT' ?
                        "Half Time"
                        :
                        status === '2H' ?
                        "Second Half"
                        :
                        status === 'ET' ?
                        "Extra Time"
                        :
                        status === 'P' ?
                        "Penalty Kicks"
                        :
                        status === 'FT' ?
                        "Full Time"
                        :
                        status === 'AET' ?
                        "Full Time + AET"
                        :
                        status
                    }
                    </p>
            </div>
        </div>
    );
}

export default Fixture;