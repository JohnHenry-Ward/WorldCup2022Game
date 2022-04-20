/* Libraries */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Interal Requirements */
import '../css/League.css';
import soccerBallLogo from '../images/icons/soccerBall.svg';

const League = ({ league }) => {

    return (
        <div className='league'>
            <img src={soccerBallLogo} className='leagueLogo' alt='soccer ball icon'></img>
            <div className='leagueInfo'>
                <p>{league.name}</p>
            </div>
            <NavLink to={`/league/${league.id}`} className='leagueGoToBTN'>Go To League</NavLink>
        </div>
    );

}

export default League;