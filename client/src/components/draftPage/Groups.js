/* Libraries */
import React from "react";

/* Other Components */
import Group from './Group';

/* Internal Requirements */

const Groups = ({ groups, draftedTeams }) => {

    let groupCounter = 0;

    return (
        <div>
            <div className="groups">
            {
                groups.map((group) => {
                    groupCounter++;
                    return (
                        <Group group={group} key={groupCounter} draftedTeams={draftedTeams} />
                    );
                })
            }
            </div>
        </div>
    );
}

export default Groups;