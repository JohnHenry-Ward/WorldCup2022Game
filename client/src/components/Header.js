/* Libraries */
import React from 'react';

/* Other Components */
import LoginPopup from './LoginPopup';

/* Interal Requirements */
import userIcon from '../images/icons/user.svg';
import '../css/Header.css';

/* Internval JavaSript */
const getCookies = require('../js/getCookies');
const popup = require('../js/popup');

const Header = ({user, setSignIn}) => {

    const openLoginModal = () => {
        document.getElementById('loginPopupBG').style.display = 'flex';
    }

    const logout = () => {
        getCookies.clearCookies();
        setSignIn(false);
        popup.closePopup('#loginPopupBG');
    }

    return (
        <div>
            {/* <GooglePopup user={user} logout={logout} closePopup={(e) => popup.closePopup('#googleLoginPopupBG')}/> */}
            <LoginPopup user={user} logout={logout} closePopup={(e) => {popup.closePopup('#loginPopupBG'); popup.closePopup('#createAccountPopupBG')}} />
            <div className='header'>
                <a href='/' className='headerTitle'>World Cup 2022</a>
                <div className='accountInfo' onClick={openLoginModal}>
                    <p className='userName'>{ user.length !== 0 ? user : 'Sign In' }</p>
                    <img src={userIcon} className='userIcon' alt='Generic user account icon'></img>
                </div>
            </div>
        </div>
        
    );

}

Header.defaultProps = {
    setSignIn: () => {
        if (window.location.toString().includes("localhost")) {
            window.location.replace('http://localhost:3000/');
        } else {
            window.location.replace('http://worldcupdraft.me');
        }
    }
}

export default Header;