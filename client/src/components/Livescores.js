/* Requirements */
import React, { useEffect, useState } from 'react';

/* Components */
import SmallFixture from './SmallFixture';

/* Internal Requirements */

/* Internval JavaSript */
import { getFixtures } from '../js/requests';


const Livescores = () => {

    /* Use State */
    const [allFixtures, setFixtures] = useState([]);
    // const [todaysFixtures, setTodaysFixtures] = useState([]);
    // const [todaysDate, setTodaysDate] = useState();
    const today = new Date();
    /* Use Effect */
    useEffect(async () => {
        const fixtures = await getFixtures();
        let allF = JSON.parse(fixtures);
        setFixtures(allF);
        // let result = allF.filter((f) => {
        //     return Math.abs(dateDiffInDays(new Date(f.fixture.date), today)) < 9; // set this to 2 when done testing
        // });
        // result.sort((a, b) => {
        //     return a.fixture.date > b.fixture.date;
        // })
        // setFixtures(result);

        // const livescoresElement = document.querySelector('.liveScoreboard-scores');
        // const mostRelevantGame = document.querySelector('.mostRelevantGame');
        // livescoresElement.scrollTo(0, mostRelevantGame)

    }, []);

    const dateDiffInDays = (a, b) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    let gameNumber = 0;

    return (
        <div className='liveScoreboard'>
            <h1 className='liveScoreboard-header'>Scoreboard</h1>
            <div className='liveScoreboard-scores'>
                {
                    allFixtures.map(fixture => {
                        gameNumber++;
                        return (
                            <div key={fixture.fixture.id}>
                                <SmallFixture fixture={fixture} gameNumber={gameNumber} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Livescores;