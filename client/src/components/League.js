/* Libraries */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Other Components */
import Button from './Button';

/* Interal Requirements */
import '../css/League.css';
import soccerBallLogo from '../images/icons/soccerBall.svg';
// const leagueGetter = require('../js/leagueGetter'); // this one must be the last one or else react complains

const League = ({ league }) => {
    return (
        <div className='league'>
            <img src={soccerBallLogo} className='leagueLogo' alt='soccer ball icon'></img>
            <div className='leagueInfo'>
                <p>{league.name}</p>
                <p>~points~</p>
                <p>~position~</p>  
            </div>
            <NavLink to={`/league/${league.id}`} className='leagueGoToBTN'>Go To League</NavLink>
        </div>
    );

}

export default League;