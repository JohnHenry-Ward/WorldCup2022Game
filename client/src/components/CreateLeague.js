/* Libraries */
import React from 'react';
import { useState } from 'react';

/* Internal Requirements */
import '../css/CreateJoinLeague.css';
const requests = require('../js/requests');

const CreateLeague = ({closePopup}) => {

    /* Use States */
    const [leagueName, setLeagueName] = useState('');
    const [leaguePassword, setLeaguePassword] = useState('');
    const [leaguePlayerCount, setLeaguePlayerCount] = useState(2);

    const onSubmit = async (e) => {
        e.preventDefault();
        await requests.createLeague(leagueName, leaguePassword, leaguePlayerCount);
        setLeagueName(' ');
        setLeaguePassword(' ');
        setLeaguePlayerCount(2);
        closePopup();
    }

    return (
        <div className="popupBG" id='createPopup'>
            <div className="content">
            <h1 className='createTitle'>Create A League</h1>
            <form className='createLeagueForm' onSubmit={onSubmit}>
                <label htmlFor="leagueName">League Name</label>
                <input type="text" name="leagueName" required onChange={(e) => setLeagueName(e.target.value)}></input>
                <label htmlFor="leaguePassword">Password</label>
                <input type="text" name="leaguePassword" required onChange={(e) => setLeaguePassword(e.target.value)}></input>
                <label htmlFor="playerCount">Number of players</label>
                <select name="numberOfPlayers" id="numberOfPlayers" onChange={(e) => setLeaguePlayerCount(e.target.value)}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <input type="submit" value="Create!"></input>
            </form>
            <button className='closeCreatePopup' onClick={closePopup}>Cancel</button>
            </div>
        </div>
       
    );
}

export default CreateLeague;