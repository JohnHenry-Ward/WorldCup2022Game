/* Libraries */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Internal Requirements */
import '../css/GooglePopup.css';

/* Dev-Config */
let googleClientId = null;
if (process.env.NODE_ENV !== 'production') {
    const config = require('../config/dev_config.json');
    googleClientId = config.GoogleClientID;
} else {
    googleClientId = process.env.googleClientId;
}

/* Internal JavaScript */
const isSignedIn = require('../js/isSignedIn');

const GooglePopup = ({user, logout, closePopup}) => {

    return (
        <div id="googleLoginPopupBG">
            <div id="g_id_onload"
                data-client_id={googleClientId}
                data-context="use"
                data-ux_mode="popup"
                data-login_uri="http://localhost:5000/login"
                data-auto_prompt="false">
            </div>
            <div id="googleLoginPopupContent">
                {
                    isSignedIn.isSignedIn()
                    ? 
                    <div>
                        <h4 id='popupTitle'>Signed in as: {user}</h4>
                        <div className='btnsWrapper'>
                            <button onClick={logout} id='signOutBtn'>Sign Out</button>
                            <NavLink to={'/account'} className='goToAccountBtn'>Go To Account</NavLink>
                        </div>
                    </div>
                    : 
                    <div>
                        <h4 id='popupTitle'>Sign in with Google</h4>
                        <h5 id='popupSubTitle'>Not showing up? Refresh the page</h5>
                        <div className="g_id_signin"
                            data-type="icon"
                            data-shape="square"
                            data-theme="outline"
                            data-text="signin_with"
                            data-size="large"
                            data-logo_alignment="left">
                        </div>
                    </div>
                }
                
                <button className='closeGooglePopup' onClick={closePopup}>Close</button>
            </div>
        </div>
    );
}

export default GooglePopup;