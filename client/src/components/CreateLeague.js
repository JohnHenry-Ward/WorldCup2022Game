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

    const onSubmit = async (e) => {
        e.preventDefault();
        await requests.createLeague(leagueName, leaguePassword);
        setLeagueName(' ');
        setLeaguePassword(' ');
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