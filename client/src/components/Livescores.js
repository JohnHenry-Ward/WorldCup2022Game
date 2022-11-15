/* Requirements */
import React, { useEffect, useState } from 'react';

/* Components */
import RankAndOdds from './RankAndOdds';

/* Internal Requirements */

/* Internval JavaSript */
import { getTeams } from '../js/requests';


const Livescores = () => {

    /* Use State */
    const [teams, setTeams] = useState([]);
    
    /* Use Effect */
    useEffect(async () => {
        const t = await getTeams();
        setTeams(t);
    }, []);

    const sortByRank = () => {
        const t = [...teams].sort((a, b) => {
            return parseInt(a.rank) > parseInt(b.rank);
        });
        setTeams(t);
    }

    const sortByOdds = () => {
        const t = [...teams].sort((a, b) => {
            return (
                parseInt(a.odds.split("/")[0]) / parseInt(a.odds.split("/")[1]) 
                > 
                parseInt(b.odds.split("/")[0]) / parseInt(b.odds.split("/")[1])
            )
        });
        setTeams(t);
    }

    return (
        <div className='ranksAndOddsBoard'>
            <h1 className='ranksAndOddsBoard-header'>FIFA Ranks and Odds</h1>
                <div className='ranksAndOddsBoard-buttons'>
                    <button className='sortBtn' onClick={sortByRank}>Sort by Rank</button>
                    <button className='sortBtn' onClick={sortByOdds}>Sort by Odds</button>
                </div>
                <div className='ranksAndOddsBoard-wrapper'>
                    {
                        teams.map(team => {
                            return(
                                <RankAndOdds key={team.code} team={team} />
                            )
                        })
                        
                    }
                </div>
        </div>
    );
}

export default Livescores;