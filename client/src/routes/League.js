/* Requirements */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

/* Other Components */
import Header from "../components/Header";
import Standings from '../components/leaguePage/Standings';
import Groups from '../components/leaguePage/Groups';
import Schedule from '../components/leaguePage/Schedule';

/* Internal Requirements */
import '../css/leaguePage/league.css';
import infoIcon from '../images/icons/circle-info-solid.svg';
import { openPopup, closePopup } from '../js/popup';
const getCookies = require('../js/getCookies');
const requests = require('../js/requests');
const { generateOrder, picksPerPlayer } = require('../js/draft');


const League = () => {
    /* Routes Parameters */
    const leagueID = useParams().id;

    /* Use States */
    const [leagueData, setLeagueData] = useState({ });
    const [hasDrafted, setHasDrafted] = useState(false);
    const [draftStatus, setDraftStatus] = useState()
    const [players, setPlayers] = useState([]); // need a seperate var to the players array for some reason
    const [isLeagueOwnwer, setIsLeagueOwner] = useState(false);
    const [draftDate, setDraftDate] = useState({ });
    const [allFixtures, setFixtures] = useState([]);
    const [allGroups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    /* Use Effects */

    /* Get Fixtures */
    useEffect(async () => {
        const fixtures = await requests.getFixtures();
        setFixtures(fixtures);
    }, []);

    /* Get Group Stage */
    useEffect(async () => {
        const g = await requests.getGroupStage();
        setGroups(g[0].league.standings);
    }, []);

    /* Get League Data */
    useEffect(async () => {
        setIsLoading(true); //sometimes get unmounted error, unsure if this is the fix
        const response = await requests.getLeagueData(leagueID);
        setPlayers(response.players);
        setLeagueData(response);
        setDraftDate(new Date(response.draft.draftDate));
        setHasDrafted(response.draft.hasDrafted);
        setDraftStatus(response.draft.draftStatus);

        response.players.forEach(player => {
            if (player.isCreator) {
                if (player.playerName === getCookies.getCookies()["username"]){
                    setIsLeagueOwner(true)
                }
            }
        });

        setIsLoading(false);
    }, []);

    const startDraft = async () => {
        const fullOrder = generateOrder(leagueData.numberOfPlayers);
        const totalPicks = picksPerPlayer(leagueData.numberOfPlayers) * leagueData.numberOfPlayers;
        const res = await requests.startDraft(leagueData.leagueID, fullOrder, totalPicks);
    }

    return (
        <main>
            <Header user={getCookies.getCookies()['username']}/>
            {
                
                <div>
                    <div className='league-header'>
                        <div className='leagueTitle'>
                            <h2 className='leagueName'>{leagueData.name}</h2>
                            <img src={infoIcon} className='infoIcon' onClick={() => openPopup('#leagueInfoPopupBG')}></img>
                        </div>
                        <div id='leagueInfoPopupBG'>
                            <div id='leagueInfoPopupContent'>
                                <h4>League ID: {leagueData.leagueID}</h4>
                                <h4>League Password: {leagueData.password}</h4>
                                <ul id='scoringStructure'>
                                    <li>Group Stage Win: 2 points</li>
                                    <li>Group Stage Tie: 1 point</li>
                                    <li>Round of 16 Win: 4 points</li>
                                    <li>Quaterfinal Win: 6 points</li>
                                    <li>Semifinal Win: 8 points</li>
                                    <li>Final Win: 10 points</li>
                                </ul>
                                <button className='closeLeagueInfoPopup' id='closeBtn' onClick={() => closePopup('#leagueInfoPopupBG')}>Close</button>
                            </div>
                        </div>
                        {
                            ! isLoading &&
                            draftStatus === "PRE" && isLeagueOwnwer ?
                            <div>
                                <div>Click the button to start the draft once everyone is ready!</div>
                                <button className='draftGoToBtn' onClick={startDraft}>Start Draft</button>
                            </div>
                            :
                            draftStatus === "PRE" && ! isLeagueOwnwer ?
                                <div>
                                    Ask the league owner to start the draft once everyone is ready!
                                </div>
                            :
                            draftStatus === "LIVE" ?
                            <div>
                                <div>Draft Is Live!</div><br></br>
                                <NavLink to={`/draft/${leagueID}`} className='draftGoToBtn'>Go To Draft</NavLink>
                            </div>
                            :
                            draftStatus === "POST" ?
                            <div></div>
                            :
                            <div></div>
                        }
                    </div>
                    <div className='main-content'>
                        
                        <div className='live-status'>
                            <Schedule players={players} fixtures={allFixtures} groups={allGroups} />
                            <Groups players={players} groups={allGroups} />
                        </div>

                        <div className='standings'>
                            <Standings players={players} fixtures={allFixtures} hasDrafted={hasDrafted}/>
                        </div>
                        
                    </div>
                </div>
            }
        </main>
    );
}

export default League;