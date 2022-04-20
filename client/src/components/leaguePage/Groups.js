/* Libraries */
import React from "react";

/* Other Components */
import Group from './Group';

/* Internal Requirements */
import '../../css/leaguePage/groups.css';
import { toggleLeagueSection } from "../../js/animation";

const Groups = ({ players, groups }) => {

    let groupCounter = 0;

    return (
        <div className="group-stage-wrapper">
            <h1 className="section-title" onClick={(e) => toggleLeagueSection('.group-stage')}>Group Standings</h1>
            <div className="group-stage">
            {
                groups.map((group) => {
                    groupCounter++;
                    return (
                        <Group group={group} players={players} key={groupCounter}/>
                    );
                })
            }
            </div>
        </div>
    );
}

export default Groups;