/* Libraries */
import React, { useEffect, useState } from "react";

/* Other Components */
import Fixture from './Fixture';

/* Internal Requirements */
import '../../css/leaguePage/schedule.css';
const fixtures = require('../../config/fixtures.json').response; //strictly for testing
const requests = require('../../js/requests');

const Schedule = ({ players }) => {

    /* Use State */
    const [allFixtures, setFixtures] = useState([]);

    useEffect(async () => {
        // const fixtures = await requests.getFixtures();
        setFixtures(fixtures);
        // console.log(fixtures);
    }, []);

    return (
        <div className="schedule">
            <h1 className="section-title">Schedule</h1>
            <div className="stage"> {/* will be group stage, knockout, etc */}
            <p className="stage-title">Group Stage</p>
            {
                allFixtures.map((game) => {
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