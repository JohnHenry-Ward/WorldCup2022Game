/* Libraries */
import React, { useEffect, useState } from "react";

/* Other Components */
import Group from './Group';

/* Internal Requirements */
import '../../css/leaguePage/groups.css';
const g = require('../../config/groupStage.json').response[0]; // strictly for testing
const requests = require('../../js/requests');

const Groups = ({ players }) => {

    /* Use State */
    const [allGroups, setGroups] = useState([]);

    useEffect(async () => {
        // const g = await requests.getGroupStage();
        setGroups(g.league.standings);
    }, []);

    let groupCounter = 0;

    return (
        <div className="group-stage-wrapper">
            <h1 className="section-title">Group Standings</h1>
            <div className="group-stage">
            {
                allGroups.map((group) => {
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