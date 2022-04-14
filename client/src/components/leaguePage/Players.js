/* Libraries */
import React from "react";

/* Other Components */
import Player from "./Player";

/* Internal Requirements */
import '../../css/leaguePage/standings.css';

const Players = ({ players }) => {

    return (
        <div className='player-scores'>
            <h5 className="player-scores-title">Standings</h5>
            <table className="player-standings-table">
                <tbody>
                    {
                        players.map(p => {
                                return (
                                    <Player key={p.playerID} player={p} />
                                );
                            })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Players;