/* Requirements */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Other Components */
import Header from "../components/Header";
import Standings from '../components/leaguePage/Standings';

/* Internval JavaSript */
const getCookies = require('../js/getCookies');
const requests = require('../js/requests');

const League = () => {
    /* Routes Parameters */
    const leagueID = useParams().id;

    /* Use States */
    const [user, setUser] = useState(getCookies.getCookies()['userName']);
    const [leagueData, setLeagueData] = useState({ });
    const [players, setPlayers] = useState([]); // need a seperate var to the players array for some reason

    /* Use Effects */
    useEffect(async () => {
        const response = await requests.getLeagueData(leagueID);
        setPlayers(response.players);
        setLeagueData(response);
    }, []);

    return (
        <main>
            <Header user={user}/>
            <h3>League Name: {leagueData.name}</h3>
            
            <Standings players={players} />
            
            
            {/* <div>
                {
                    players.map(p => {
                        return (
                            <div key={p.playerID}>
                                <p>{p.playerName}</p>
                                {
                                    p.teamsID.map(t => {
                                        return (
                                            <p key={t}>{t}</p>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div> */}
            
            
        </main>
    );
}

export default League;