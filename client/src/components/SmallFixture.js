/* Libraries */
import React from "react";

/* Other Components */

/* Internal Requirements */
import '../css/leaguePage/schedule.css';
const teamCodes = require('../js/convert').teamCodes;

const SmallFixture = ({ fixture, gameNumber }) => {
    const homeTeamCode = teamCodes[fixture.teams.home.name];
    const awayTeamCode = teamCodes[fixture.teams.away.name];
    const status = fixture.fixture.status.short;

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const d = new Date(fixture.fixture.date);
    const date = months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.toLocaleTimeString([], {timeStyle: 'short'});

    return (
        <div className="fixture-wrapper" id="smallFixture-wrapper">
            <div className="fixture" id='smallFixture-fixture' title={'Game ' + gameNumber}>
                <div className="team" id="home">
                    <p className="team-name">{homeTeamCode}</p>
                    <img className="team-flag" src={require("../images/flags/"+homeTeamCode+".png")} alt={homeTeamCode+' flag'} />
                </div>
                <div className="score">
                    <p id="home">{fixture.goals.home || 0}</p>
                    <p>-</p>
                    <p id="away">{fixture.goals.away || 0}</p>
                </div>
                <div className="team" id="away">
                    <img className="team-flag" src={require("../images/flags/"+awayTeamCode+".png")} alt={awayTeamCode+' flag'} />
                    <p className="team-name">{awayTeamCode}</p>
                </div>
            </div>
            <div className="gameStatus">
                <p className="text">
                    {
                        status === 'NS' ?
                        date
                        :
                        status === 'PEN' ?
                        status + ' (' + fixture.score.penalty.home + '-' + fixture.score.penalty.away + ')'
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

export default SmallFixture;