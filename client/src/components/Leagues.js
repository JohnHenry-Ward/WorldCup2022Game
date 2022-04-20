/* Libraries */
import React from 'react';

/* Other Components */
import League from './League';

/* Interal Requirements */
import '../css/League.css';

const Leagues = ({ allLeagues }) => {
    return (
        <div className='leagues'>
            {
                allLeagues.length === 0
                    ? <p className='noLeaguesFiller'>You have no leagues yet!</p>
                    : allLeagues.map(league => {
                        return (
                            <League key={league.id} league={league} />
                        );
                    })
            }
        </div>
    );

}

export default Leagues;