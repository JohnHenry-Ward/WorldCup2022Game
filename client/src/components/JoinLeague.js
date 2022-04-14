/* Libraries */
import React from 'react';
import { useState } from 'react';

/* Internal Requirements */
import '../css/CreateJoinLeague.css';
const requests = require('../js/requests');

const JoinLeague = ({closePopup}) => {

    /* Use States */
    const [leagueID, setLeagueID] = useState('');
    const [leaguePassword, setLeaguePassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await requests.joinLeague(leagueID, leaguePassword);
        setLeagueID(' ');
        setLeaguePassword(' ');
        closePopup();
    }

    return (
        <div className="popupBG" id='joinPopup'>
            <div className="content">
            <h1 className='createTitle'>Join A League</h1>
            <form className='createLeagueForm' onSubmit={onSubmit}>
                <label htmlFor="leagueID">League ID</label>
                <input type="text" name="leagueID" required onChange={(e) => setLeagueID(e.target.value)}></input>
                <label htmlFor="leaguePassword">Password</label>
                <input type="text" name="leaguePassword" required onChange={(e) => setLeaguePassword(e.target.value)}></input>
                <input type="submit" value="Join!" className='createJoinBTN'></input>
            </form>
            <button className='createJoinBTN' onClick={closePopup}>Cancel</button>
            </div>
        </div>
       
    );
}

export default JoinLeague;