/* Internal Requirements */
const teamCodes = require('../js/convert').teamCodes;

const RankAndOdds = ({ team }) => {

    return (
        <div className='ranksAndOddsBoard-team'>
            <img className="team-flag" src={require("../images/flags/"+team.code.toUpperCase()+".png")} alt={team.code+' flag'} />
            <div>{team.country}</div>
            <div>Rank: {team.rank}</div>
            <div>Odds: {team.odds}</div>
        </div>
    );
}

export default RankAndOdds;