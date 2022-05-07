/* Libraries */
import React from "react";

/* Other Components */
import Group from './Group';

/* Internal Requirements */
import '../../css/draftPage/groups.css';

const Groups = ({ groups }) => {

    let groupCounter = 0;

    return (
        <div className="groups-wrapper">
            <h1 className="groups-title">Group Standings</h1>
            <div className="groups">
            {
                groups.map((group) => {
                    groupCounter++;
                    return (
                        <Group group={group} key={groupCounter}/>
                    );
                })
            }
            </div>
            <button className='confirm-btn'>Select <span id='selection'></span></button>
        </div>
    );
}

export default Groups;