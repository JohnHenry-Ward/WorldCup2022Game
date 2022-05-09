/* Libraries */
import React from 'react';
import { useState } from 'react';

/* Internal Requirements */
import '../css/CreateJoinLeague.css';
const requests = require('../js/requests');
const isSignedIn = require('../js/isSignedIn');

const CreateLeague = ({closePopup}) => {

    /* Use States */
    const [leagueName, setLeagueName] = useState('');
    const [leaguePassword, setLeaguePassword] = useState('');
    const [leagueDraftDate, setLeagueDraftDate] = useState('');
    const [leagueDraftTime, setLeagueDraftTime] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        let dateTime = new Date(leagueDraftDate + 'T' + leagueDraftTime)
        //console.log(dateTime.toDateString(), dateTime.toLocaleTimeString()); temp to show conversion to easy to read string
        await requests.createLeague(leagueName, leaguePassword, dateTime);
        setLeagueName(' ');
        setLeaguePassword(' ');
        setLeagueDraftDate(' ');
        setLeagueDraftTime(' ');
        closePopup();
    }

    return (
        <div className="popupBG" id='createPopup'>
            <div className='content'>
            {
                isSignedIn.isSignedIn() ?
                <div>
                <h1 className='createTitle'>Create A League</h1>
                <form className='createLeagueForm' onSubmit={onSubmit}>
                    <label htmlFor="leagueName">League Name</label>
                    <input type="text" name="leagueName" required onChange={(e) => setLeagueName(e.target.value)}></input>
                    <label htmlFor="leaguePassword">Password</label>
                    <input type="text" name="leaguePassword" required onChange={(e) => setLeaguePassword(e.target.value)}></input>
                    <label htmlFor="leagueDraftDate">Draft Date</label>
                    <input type="date" name="leagueDraftDate" required onChange={(e) => setLeagueDraftDate(e.target.value)}></input>
                    <label htmlFor="leagueDraftTime">Draft Time (Local to you)</label>
                    <input type="time" name="leagueDraftTime" required onChange={(e) => setLeagueDraftTime(e.target.value)}></input>
                    <input type="submit" value="Create!" className='createJoinBTN'></input>
                </form>
                </div>
                :
                <h1>You must be signed in to create a league</h1>
            }
                <button className='createJoinBTN' onClick={closePopup}>Cancel</button>
            </div>
        </div>
       
    );
}

export default CreateLeague;