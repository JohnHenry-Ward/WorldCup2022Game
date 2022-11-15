/* Internal Requirements */
const teamCodes = require('../js/convert').teamCodes;

const RankAndOdds = ({ team }) => {

    return (
        <div className='ranksAndOddsBoard-team'>
            <img id='ranksAndOddsBoard-flag' className="team-flag" src={require("../images/flags/"+team.code.toUpperCase()+".png")} alt={team.code+' flag'} />
            <div id='ranksAndOddsBoard-country'>{team.country}</div>
            <div id='ranksAndOddsBoard-rank'>Rank: {team.rank}</div>
            <div id='ranksAndOddsBoard-odds'>Odds: {team.odds}</div>
        </div>
    );
}

export default RankAndOdds;