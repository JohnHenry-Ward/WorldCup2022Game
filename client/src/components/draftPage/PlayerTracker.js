/* Requirements */
import React, {useState, useEffect} from 'react';

/* Other Components */

/* Internval Requirements */
const draft = require('../../js/draft');
const fullNames = require('../../js/convert').fullNames;
import '../../css/draftPage/draft.css';

const PlayerTracker = ({ player, draftedTeams, picksPerPlayer, playerPickNum, playerCount, maxPicks }) => {
    /* Use States */;
    const [playersTeams, setPlayersTeams] = useState([]);

     /* Use Effect */
     useEffect(() => {
        let start = player.playerNumber * picksPerPlayer;
        let end = start + picksPerPlayer;
        let futurePicks = draft.getFuturePicks(playerPickNum, playerCount);
        let playerPicks = draftedTeams.slice(start, end);
        for (let i = 0; i < playerPicks.length; i++) {
            if (Object.keys(playerPicks[i])[0] === 'TBD') {
                playerPicks[i]['pickNum'] = `Pick ${futurePicks[i]}`;
            }
        }
        setPlayersTeams(playerPicks);
    }, [draftedTeams]);

    let x = -1;

    return (
        <div className='playerTracker'>
            <div className='playerTrackerHeader'>
                <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
                <div className='playerName'>{player.playerName}</div>
                <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
            </div>
            <div className='picks'>
                {
                    playersTeams.map(t => {
                        x++;
                        return (
                            
                            <div className='pick' key={Object.keys(t) + player.playerNumber + x}>
                                <img src={require("../../images/flags/"+Object.keys(t)[0]+".png")} className="team-flag draft-team-flag" alt={Object.keys(t)+' flag'} />
                                <p className='pick-name'>
                                    {
                                        Object.keys(t)[0] === 'TBD' ?
                                        Object.values(t)[1]
                                        :
                                        fullNames[Object.keys(t)[0]]
                                    }
                                </p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default PlayerTracker;