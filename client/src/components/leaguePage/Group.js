/* Libraries */
import React from "react";

/* Other Components */
import Team from './Team';

/* Internal Requirements */
import '../../css/leaguePage/groups.css';

const Group = ({ group, players }) => {

    group.sort((a, b) => {
        if (a.points == b.points) {
            return a.goalsDiff < b.goalsDiff ? 1 : -1;
        }
        else {
            return a.points < b.points ? 1 : -1;
        }
    })

    return (
        <div className="group">
            <h5 className="group-stage-title">{group[0].group}</h5>
            <table className="group-table">
                <thead className="group-header">
                    <tr>
                        <td colSpan={3}></td>
                        <td>W</td>
                        <td>T</td>
                        <td>L</td>
                        <td>PTS</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        group.map(team => {
                            return (
                                <Team team={team} players={players} key={team.rank}/>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Group;