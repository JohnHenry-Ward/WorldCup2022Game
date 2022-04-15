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
            <Header user={getCookies.getCookies()['userName']}/>
            <h3>League Name: {leagueData.name}</h3>
            <h4>League ID: {leagueData.leagueID}</h4>
            <h4>League Password: {leagueData.password}</h4>
            {
                ! leagueData.hasDrafted ?
                <Standings players={players} />
                :
                <h1>This league has not drafted</h1>
            }
            
        </main>
    );
}

export default League;