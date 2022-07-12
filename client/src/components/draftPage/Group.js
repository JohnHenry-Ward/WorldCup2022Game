/* Libraries */
import React from "react";

/* Other Components */
import Team from './Team';

/* Internal Requirements */
// import '../../css/leaguePage/groups.css';

const Group = ({ group, draftedTeams }) => {

    return (
        <div className="group">
            <h5 className="group-stage-title">{group[0].group}</h5>
            <table className="group-table">
                <tbody>
                    {
                        group.map(team => {
                            return (
                                <Team team={team} key={team.rank} draftedTeams={draftedTeams} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Group;