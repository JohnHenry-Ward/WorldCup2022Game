/* Libraries */
import React from "react";

/* Other Components */
import Fixture from './Fixture';

/* Internal Requirements */
import '../../css/leaguePage/schedule.css';

const Schedule = ({ players, fixtures }) => {

    return (
        <div className="schedule">
            <h1 className="section-title">Schedule</h1>
            <div className="stage"> {/* will be group stage, knockout, etc */}
            <p className="stage-title">Group Stage</p>
            {
                fixtures.map((game) => {
                    return(
                        <Fixture key={game.fixture.id} game={game} players={players} />
                    );
                })
            }
            </div>
        </div>
    );
}

export default Schedule;