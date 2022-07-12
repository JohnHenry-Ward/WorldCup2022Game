/* Requirements */
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

/* Other Components */
import Header from "../components/Header";
import Groups from '../components/draftPage/Groups';
import Timer from '../components/Timer';
import Order from '../components/draftPage/Order';
import Tracker from '../components/draftPage/Tracker';

/* Internval Requirements */
const getCookies = require('../js/getCookies');
const requests = require('../js/requests');
const draft = require('../js/draft');
import '../css/draftPage/draft.css';

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
        setLoggedInUserName(cookies['userName']);

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
    }, [players, currentPick]);

    useEffect(() => {
        if (!isLoading) {
            draft.scrollOrderElement('current');
        }
    }, [isLoading]);

    return (
        <div className='draft'>
            <Header user={getCookies.getCookies()['userName']} />
            {
                !isLoading &&
                <div>
                    {
                    /*!*/ leagueData.draft.hasDrafted ?
                    <Timer countingTo={draftDate} text={'Until Draft!'} />
                    :
                    <div className='groups-and-order'>
                        <div className='groups-wrapper'>
                            <div className='order-and-status'>
                                <div className='status'>
                                    <div className='currentPicker'>On The Clock: {currentPlayerName}</div>
                                    {/* <div className='pickTimer'>Time Left: 1:00</div> */}
                                    <div className='pickTracker'>Pick: {currentPick} / {maxPicks}</div>
                                </div>
                                <Order maxPicks={maxPicks} players={players} currentPick={currentPick} order={currentOrder}/>
                            </div>
                            <Groups groups={groupStage} draftedTeams={draftedTeams}/>
                            <button className='confirm-btn'
                                    onClick={() => {
                                        let res = draft.confirmDraftSelection(currentTeam, currentPlayerNum, leagueID);
                                        if (res === true) { // this might not work, confirmDraftSelection is async :(
                                            draft.updateDraftedTeams(currentTeam, currentPlayerNum, draftedTeams, setDraftedTeams);
                                            draft.goToNextPlayer(currentPick, setCurrentPick);
                                            draft.scrollOrderElement('next'); 
                                        }
                                    
                                    }}>
                                Select&nbsp;
                                <span id='selection'></span>
                            </button>
                            <h1 className='draft-title'>Pick Tracker</h1>
                            <div className='picks-tracker'>
                                <Tracker players={players} draftedTeams={draftedTeams} maxPicks={maxPicks} order={currentOrder} />
                            </div>
                        </div>
                        
                    </div>
                    }
                </div>
            }
        </div>
    );
}

export default Draft;