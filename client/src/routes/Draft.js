/* Requirements */
import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';

/* Other Components */
import Header from "../components/Header";
import Groups from '../components/draftPage/Groups';
import Order from '../components/draftPage/Order';
import Tracker from '../components/draftPage/Tracker';

/* Internval Requirements */
import '../css/draftPage/draft.css';
const getCookies = require('../js/getCookies');
const requests = require('../js/requests');
const draft = require('../js/draft');
const popup = require('../js/popup');
const FIFArank = require('../js/odds').FIFArank;
const odds = require('../js/odds').odds;
const codes = require('../js/convert').teamCodes;


const Draft = () => {
    /* Routes Parameters */
    const leagueID = useParams().id;

    /* Use States */
    const [groupStage, setGroupStage] = useState([]);
    const [currentPick, setCurrentPick] = useState(null);
    const [currentTeam, setCurrentTeam] = useState(null);
    const [currentPlayerNum, setCurrentPlayerNum] = useState(null);
    const [currentPlayerName, setCurrentPlayerName] = useState('');
    const [draftedTeams, setDraftedTeams] = useState([]);
    const [maxPicks, setMaxPicks] = useState(null);
    const [leagueData, setLeagueData] = useState({});
    const [draftDate, setDraftDate] = useState('');
    const [players, setPlayers] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [loggedInUserName, setLoggedInUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // THESE USE EFFECTS CAN BE MUCH BETTER ORGANIZED ESPECIALLY WITH THE INTERVAL FIRING EVERY 5 SECONDS

    /* Use Effects */
    useEffect(async () => {
        setIsLoading(true);
        const g = await requests.getGroupStage();
        setGroupStage(JSON.parse(g)[0].league.standings);
        const l = await requests.getLeagueData(leagueID);
        setLeagueData(l);
        setCurrentPick(l.draft.pickStatus.currentPick);
        setMaxPicks(l.draft.pickStatus.totalPicks);
        setCurrentOrder(l.draft.draftOrder);
        setDraftDate(new Date(l.draft.draftDate));

        let temp = [];

        l.players.forEach(p => {
            let picksPerPlayer = draft.picksPerPlayer(l.players.length);
            let num = p.playerNumber;
            let start = num * picksPerPlayer;

            for (let i = 0; i < picksPerPlayer; i++) {
                temp.push({'TBD' : num});
            }

            p.teamsID.forEach(t => {
                temp[start] = {[t]: num};
                start++;
            });
        });
        setDraftedTeams(temp);

        setPlayers(l.players);

        let cookies = getCookies.getCookies();
        setLoggedInUserName(cookies['username']);

        setIsLoading(false);
        draft.setEventListeners(setCurrentTeam, temp); //must do this after page is loaded
    }, []);

    useEffect(() => {
        setCurrentPlayerNum(currentOrder[currentPick - 1]); // pick starts on 1

        let temp = '';
        players.forEach(p => {
            if (p.playerNumber === currentOrder[currentPick - 1]) {
                temp = p.playerName;
            }
        });

        setCurrentPlayerName(temp);
        if (getCookies.getCookies()['username'] !== temp) {
            document.querySelector('.draftClickDisableWrapper').style.pointerEvents = 'none'; // set to none after testing
        } else {
            document.querySelector('.draftClickDisableWrapper').style.pointerEvents = 'auto';
        }

    }, [players, currentPick, leagueData]);

    useEffect(() => {
        if (!isLoading && !leagueData.draft.hasDrafted) {
            draft.scrollOrderElement('current');
        }
    }, [isLoading]);


    useEffect(() => {
        if (!isLoading) {
            if (!leagueData.draft.hasDrafted) {
                setInterval( async () => {
                    console.log('Checking for updates...')
                    const l = await requests.getLeagueData(leagueID);
                    setLeagueData(l);
                    setCurrentPick(l.draft.pickStatus.currentPick);
                    let temp = [];
                    l.players.forEach(p => {
                        let picksPerPlayer = draft.picksPerPlayer(l.players.length);
                        let num = p.playerNumber;
                        let start = num * picksPerPlayer;
            
                        for (let i = 0; i < picksPerPlayer; i++) {
                            temp.push({'TBD' : num});
                        }
            
                        p.teamsID.forEach(t => {
                            temp[start] = {[t]: num};
                            start++;
                        });
                    });
                    setDraftedTeams(temp);
                    draft.scrollOrderElement('current'); 
                    draft.setEventListeners(setCurrentTeam, temp); //must do this after page is loaded
                }, 5000)
            } else {
                window.alert('The draft is over!');
            }
        }
    }, [isLoading])
    
    return (
        <div className='draft'>
            <Header user={getCookies.getCookies()['username']} />
            <div className='draftClickDisableWrapper'>
            {
                !isLoading &&
                <div>
                    <div className='groups-and-order'>
                        <div className='groups-wrapper'>
                            {
                                !leagueData.draft.hasDrafted &&
                                <div>
                                    <div className='order-and-status'>
                                        <div className='status'>
                                            <div className='onTheClock'>On The Clock:</div>
                                            <div className='currentPicker'>
                                                <div className="player-circle" id={"player-circle-p" + currentPlayerNum}></div>
                                                {currentPlayerName}
                                            </div>
                                            <div className='pickTracker'>Pick: {currentPick} / {maxPicks}</div>
                                        </div>
                                        <Order maxPicks={maxPicks} players={players} currentPick={currentPick} order={currentOrder}/>
                                    </div>
                                

                                <Groups groups={groupStage} draftedTeams={draftedTeams}/>
                                <div className='draftButtonsWrapper'>
                                    <button className='confirm-btn'
                                            onClick={() => {
                                                let res = draft.confirmDraftSelection(currentTeam, currentPlayerNum, leagueID);
                                                if (res === true) {
                                                    if (draft.checkIfDraftIsDone(currentPick+1, maxPicks)) {
                                                        requests.endDraft(leagueID);
                                                        window.alert("The draft has ended. Good Luck!")
                                                    } else {
                                                        draft.goToNextPlayer(currentPick, setCurrentPick);
                                                        draft.scrollOrderElement('next');
                                                    }
                                                    draft.updateDraftedTeams(currentTeam, currentPlayerNum, draftedTeams, setDraftedTeams);
                                                }
                                            
                                            }}>
                                        Select&nbsp;
                                        <span id='selection'></span>
                                    </button>
                                    <button className='confirm-btn' onClick={(e) => popup.openPopup('#oddsAndRank')}>Rankings & Odds</button>
                                </div>
                                <div className='popupBG' id='oddsAndRank'>
                                    <div className='popupContent' id='oddsAndRankContent'>
                                        <div id='oddsAndRankWrapper'>
                                            <div>
                                                <h4>FIFA Rank</h4>
                                                <div className='oddsAndRankData'>
                                                    {
                                                        Object.keys(FIFArank).map(team => {
                                                            let x = {}
                                                            x[codes[team]] = 0;
                                                            
                                                            if (draftedTeams.find(dt => dt[codes[team]] == 0)) {
                                                                return (
                                                                    <div key={team} id='strikethrough'>{team + ': ' + FIFArank[team]}</div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div key={team}>{team + ': ' + FIFArank[team]}</div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <h4>Odds</h4>
                                                <div className='oddsAndRankData'>
                                                    {
                                                        Object.keys(odds).map(team => {
                                                            let x = {}
                                                            x[codes[team]] = 0;
                                                            
                                                            if (draftedTeams.find(dt => dt[codes[team]] == 0)) {
                                                                return (
                                                                    <div key={team} id='strikethrough'>{team + ': ' + odds[team]}</div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div key={team}>{team + ': ' + odds[team]}</div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <button id='closeBtn' onClick={(e) => popup.closePopup('#oddsAndRank')}>Close</button>
                                    </div>
                                </div>
                                </div>
                            }
                            <h1 className='draft-title'>Pick Tracker</h1>
                            <div className='picks-tracker'>
                                <Tracker players={players} draftedTeams={draftedTeams} maxPicks={maxPicks} order={currentOrder} />
                            </div>
                        </div>
                    </div>
                    <NavLink to={`/league/${leagueID}`} id='backToLeagueBtn'>Back To League</NavLink>
                </div>
            }
            </div>
        </div>
    );
}

export default Draft;