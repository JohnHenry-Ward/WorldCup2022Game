/* Libraries */
import React, { useState, useEffect } from "react";

/* Other Components */
import Player from "./Player";

/* Internal Requirements */
import { calculateScores } from "../../js/calculateScores";
import '../../css/leaguePage/standings.css';

const Players = ({ players, fixtures }) => {

    // useEffect(() => {
    //     players = calculateScores(players, fixtures);
    // }, [players, fixtures])

    let playerCount = 0;

    return (
        <div className='player-scores'>
            <h5 className="section-title">Standings</h5>
            <table className="player-standings-table">
                <tbody>
                    {
                        players.map(p => {
                                playerCount += 1;
                                return (
                                    <Player key={playerCount} player={p} place={playerCount} />
                                );
                            })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Players;