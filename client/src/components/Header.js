/* Libraries */
import React from 'react';

/* Other Components */
import GooglePopup from './GooglePopup';

/* Interal Requirements */
import userIcon from '../images/icons/user.svg';
import '../css/Header.css';

/* Internval JavaSript */

const Header = ({user}) => {

    const openLoginModal = () => {
        document.getElementById('googleLoginPopupBG').style.display = 'flex';
    }

    return (
        <div>
            <GooglePopup user={user}/>
            <div className='header'>
                <p className='headerTitle'>World Cup 2022</p>
                <div className='accountInfo' onClick={openLoginModal}>
                    <img src={userIcon} className='userIcon' alt='Generic user account icon'></img>
                    <p className='userName'>{ user.length !== 0 ? user : 'Sign In' }</p>
                </div>
            </div>
        </div>
        
    );

}

export default Header;