/* Requirements */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

/* Other Components */
import Header from "../components/Header";
import Standings from '../components/leaguePage/Standings';
import Groups from '../components/leaguePage/Groups';
import Schedule from '../components/leaguePage/Schedule';

/* Internal Requirements */
const getCookies = require('../js/getCookies');
const requests = require('../js/requests');
import '../css/leaguePage/league.css';

const League = () => {
    /* Routes Parameters */
    const leagueID = useParams().id;

    /* Use States */
    const [leagueData, setLeagueData] = useState({ });
    const [players, setPlayers] = useState([]); // need a seperate var to the players array for some reason
    const [draftDate, setDraftDate] = useState({ });
    const [allFixtures, setFixtures] = useState([]);
    const [allGroups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    /* Use Effects */

    /* Get Fixtures */
    useEffect(async () => {
        const fixtures = await requests.getFixtures();
        setFixtures(JSON.parse(fixtures));
    }, []);

    /* Get Group Stage */
    useEffect(async () => {
        const g = await requests.getGroupStage();
        setGroups(JSON.parse(g)[0].league.standings);
    }, []);

    /* Get League Data */
    useEffect(async () => {
        const response = await requests.getLeagueData(leagueID);
        setPlayers(response.players);
        setLeagueData(response);
        setDraftDate(new Date(response.draftDate));
        setIsLoading(false);
    }, []);

    return (
        <main>
            <Header user={getCookies.getCookies()['userName']}/>
            <div className='league-header'>
                <h3>League Name: {leagueData.name}</h3>
                <h4>League ID: {leagueData.leagueID}</h4>
                <h4>League Password: {leagueData.password}</h4>
                <h4>Draft Day: {
                        ! isLoading &&
                        draftDate.toDateString() + ' ' + draftDate.toLocaleTimeString()
                    }
                </h4>
                {
                    ! leagueData.hasDrafted &&
                    <NavLink to={`/draft/${leagueID}`} className='draftGoToBtn'>Go To Draft</NavLink>
                }
            </div>
            <div className='main-content'>
                
                <div className='live-status'>
                    <Schedule players={players} fixtures={allFixtures} groups={allGroups} />
                    <Groups players={players} groups={allGroups} />
                </div>

                <div className='standings'>
                    <Standings players={players} fixtures={allFixtures}/>
                </div>
                
            </div>
            
        </main>
    );
}

export default League;