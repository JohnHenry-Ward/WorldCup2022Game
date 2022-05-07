/* Requirements */
import React, {useState, useEffect} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

/* Other Components */
import Header from "../components/Header";
import Groups from '../components/draftPage/Groups';

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
    const [currentPick, setCurrentPick] = useState(1);
    const [maxPicks, setMaxPicks] = useState(32);
    const [playerPicksTracker, setPlayerPicksTracker] = useState([]);

    /* Use Effects */
    useEffect(async () => {
        const g = await requests.getGroupStage();
        setGroupStage(JSON.parse(g)[0].league.standings);
        draft.setEventListeners();
    }, []);
    
    return (
        <div className='draft'>
            <Header user={getCookies.getCookies()['userName']} />
            <h1>Draft</h1>
            <div className='groups-and-order'>
                <Groups groups={groupStage} />
                <div className='order-wrapper'>
                    <h3 className='order-title'>Draft Order</h3>
                    <h6 className='order-subtitle'>Total Picks: 
                        <span className='pick-current'>1</span>
                        /
                        <span className='pick-total'>32</span>
                    </h6>
                    <div className='order-tracker'>
                        pick <br></br>
                        pick <br></br>
                        pick
                    </div>
                </div>
            </div>
            {/* <div className='picks-tracker'>
                picks tracker
            </div> */}
        </div>
    );
}

export default Draft;