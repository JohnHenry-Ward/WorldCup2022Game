/* Libraries */
import React from 'react';

/* Other Components */
import GooglePopup from './GooglePopup';

/* Interal Requirements */
import userIcon from '../images/icons/user.svg';
import '../css/Header.css';

/* Internval JavaSript */
const getCookies = require('../js/getCookies');
const popup = require('../js/popup');

const Header = ({user, setSignIn}) => {

    const openLoginModal = () => {
        document.getElementById('googleLoginPopupBG').style.display = 'flex';
    }

    const logout = () => {
        getCookies.clearCookies();
        setSignIn(false);
        popup.closePopup('#googleLoginPopupBG');
    }

    return (
        <div>
            <GooglePopup user={user} logout={logout} closePopup={(e) => popup.closePopup('#googleLoginPopupBG')}/>
            <div className='header'>
                <a href='/' className='headerTitle'>World Cup 2022</a>
                <div className='accountInfo' onClick={openLoginModal}>
                    <img src={userIcon} className='userIcon' alt='Generic user account icon'></img>
                    <p className='userName'>{ user.length !== 0 ? user : 'Sign In' }</p>
                </div>
            </div>
        </div>
        
    );

}

Header.defaultProps = {
    setSignIn: () => {
        window.location.replace('http://localhost:3000');
    }
}

export default Header;