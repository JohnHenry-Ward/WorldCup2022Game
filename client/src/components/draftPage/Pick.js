/* Libraries */
import React from "react";

/* Other Components */

/* Internal Requirements */

const Pick = ({ status, pickNum, player }) => {

    /* Use States */

    /* Use Effects */

    return (
        <div>
            {
                status === 'current' ?
                <div key={pickNum} className='order-tracker-pick order-tracker-pick-current'>
                    <div className="pickNumber">
                        Pick {pickNum} 
                    </div>
                    <div className="pickText-playerCircle">
                        <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
                        <span className="pickText">{player.playerName}</span>
                    </div>
                </div>
                :
                status === 'complete' ?
                <div key={pickNum} className='order-tracker-pick order-tracker-pick-complete'>
                    <div className="pickNumber">
                        Pick {pickNum} 
                    </div>
                    <div className="pickText-playerCircle">
                        <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
                        <span className="pickText">{player.playerName}</span>
                    </div>
                </div>
                :
                <div key={pickNum} className='order-tracker-pick order-tracker-pick-incomplete'>
                    <div className="pickNumber">
                        Pick {pickNum}
                    </div>
                    <div className="pickText-playerCircle">
                        <div className="player-circle" id={"player-circle-p" + player.playerNumber}></div>
                        <span className="pickText">{player.playerName}</span>
                    </div>
                </div>
            }
        </div>
    );
}

export default Pick;