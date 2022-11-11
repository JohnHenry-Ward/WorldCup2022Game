/* Requirements */
import React from 'react';

/* Other Components */
import PlayerTracker from './PlayerTracker';

/* Internal Requirements */
import '../../css/draftPage/draft.css';
const draft = require('../../js/draft');


const Tracker = ({ players, draftedTeams, maxPicks, order }) => {

    let playerCount = 0;
    let sortedPlayers = [];
    let firstNPicks = order.slice(0, players.length);

    firstNPicks.forEach(pick => {
        players.forEach(p => {
            if(p.playerNumber === pick) {
                sortedPlayers.push(p)
            }
        });
    });
    
    return (
        <div className='tracker'>
            {
                sortedPlayers.map(p => {
                    playerCount++;
                    return (
                        <PlayerTracker player={p} draftedTeams={draftedTeams} picksPerPlayer={draft.picksPerPlayer(players.length)} maxPicks={maxPicks} playerPickNum={playerCount} playerCount={players.length} key={p.playerNumber}/>
                    );
                    
                })
            }
        </div>
    );
}

export default Tracker;