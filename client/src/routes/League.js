/* Requirements */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Other Components */
import Header from "../components/Header";
import Standings from '../components/leaguePage/Standings';
import Groups from '../components/leaguePage/Groups';
import Schedule from '../components/leaguePage/Schedule';

/* Internal Requirements */
const getCookies = require('../js/getCookies');
const requests = require('../js/requests');
const fixtures = require('../config/fixtures.json').response; //strictly for testing
const g = require('../config/groupStage.json').response[0]; // strictly for testing
import '../css/leaguePage/league.css';

const League = () => {
    /* Routes Parameters */
    const leagueID = useParams().id;

    /* Use States */
    const [leagueData, setLeagueData] = useState({ });
    const [players, setPlayers] = useState([]); // need a seperate var to the players array for some reason
    const [allFixtures, setFixtures] = useState([]);
    const [allGroups, setGroups] = useState([]);
    
    /* Use Effects */
    useEffect(async () => {
        // const fixtures = await requests.getFixtures();
        setFixtures(fixtures);
        // console.log(fixtures);
    }, []);

    useEffect(async () => {
        // const g = await requests.getGroupStage();
        setGroups(g.league.standings);
    }, []);

    
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
            <p>
                GS W: 3 <br></br>
                GS T: 1 <br></br>
                16 W: 4 <br></br>
                QT W: 6 <br></br>
                SF W: 8 <br></br>
                FN W: 12 <br></br>
            </p>
            <div className='main-content'>
                
                <div className='live-status'>
                    <Schedule players={players} fixtures={allFixtures} groups={allGroups} />
                    <Groups players={players} groups={allGroups} />
                </div>

                <div className='standings'>
                    {
                        ! leagueData.hasDrafted ?
                        <Standings players={players} fixtures={allFixtures}/>
                        :
                        <h1>This league has not drafted</h1>
                    }
                </div>
                
            </div>
            
        </main>
    );
}

export default League;