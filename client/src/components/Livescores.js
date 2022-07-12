/* Requirements */
import React, { useEffect, useState } from 'react';

/* Components */
// import Fixture from './leaguePage/Fixture';

/* Internal Requirements */

/* Internval JavaSript */
import { getFixtures } from '../js/requests';


const Livescores = () => {

    /* Use State */
    const [allFixtures, setFixtures] = useState([]);
    // const [todaysFixtures, setTodaysFixtures] = useState([]);
    // const [todaysDate, setTodaysDate] = useState();

    /* Use Effect */
    useEffect(async () => {
        const fixtures = await getFixtures();
        setFixtures(JSON.parse(fixtures));
    }, []);

    useEffect(() => {
        // let d = new Date();
        // let year = d.getFullYear();
        // let month = d.getMonth();
        // let date = d.getDate();
    }, []);

    return (
        <div className='liveScoreboard'>
            <h1 className='liveScoreboard-header'>Today's Games</h1>
            {
                allFixtures.map(fixture => {
                    return (
                        <div key={fixture.fixture.id}>
                            {fixture.fixture.date}
                        </div>
                    );
                    
                })
            }
        </div>
    );
}

export default Livescores;