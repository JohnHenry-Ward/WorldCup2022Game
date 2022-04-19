/* Libraries */
import React from "react";

/* Other Components */
import Players from "./Players";

/* Internal Requirements */
import '../../css/leaguePage/standings.css';

const Standings = ({ players }) => {

    /* tooltip stuff can be cleaned up/moved eventually */
    const allPlayers = Array.from(document.querySelectorAll('.player'));
    const allTooltips = Array.from(document.querySelectorAll('.flags-tooltip'));
    const tooltips = {};

    allTooltips.forEach(t => {
        tooltips[t.id] = t;
    });

    // will probably need to add the scroll value as well
    allPlayers.forEach(player => {
        
        player.onmouseover = () => {
            let offsets = player.getBoundingClientRect();
            let top = offsets.top;
            let left = offsets.left;
            let scroll = window.scrollY;
            let t = tooltips[player.id + '-tooltip'];
            player.style.cursor = 'pointer';
            t.style.display = 'grid';
            t.style.top = -120+scroll+top+'px';
            t.style.left = 20+left+'px';
        }

        player.onmouseout = () => {
            let t = tooltips[player.id + '-tooltip'];
            t.style.display = 'none';
        }
    });
    /* end of tooltip stuff */

    return (
        <div>
            <Players players={players}/>


            {/* tooltips, could move to other component later */}
            {
                players.map(p => {
                    return (
                        <div className="flags-tooltip" id={'player-'+p.playerNumber+'-tooltip'} key={p.playerNumber}>
                           {
                               p.teamsID.map(t => {
                                   return (
                                       <img className="flag" src={require("../../images/flags/"+t+".png")} alt={t+' flag'} key={t}/>
                                    );
                               })
                           }
                        </div>
                    );
                })
            }
            {/* end of tooltips */}

        </div>
    );
}

export default Standings;