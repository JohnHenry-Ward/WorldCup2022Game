/* Libraries */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Internal Requirements */
import '../css/GooglePopup.css';

/* Internal JavaScript */
const isSignedIn = require('../js/isSignedIn');

const GooglePopup = ({user, logout, closePopup}) => {

    return (
        <div id="googleLoginPopupBG">
            <div id="g_id_onload"
                data-client_id="638170868686-s9ri19j5lsmfktec8s5pk6orveom1th6.apps.googleusercontent.com"
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
                        <h4>Signed in as: {user}</h4>
                        <button onClick={logout}>Sign Out</button>
                        <NavLink to={'/account'} className='goToAccountBtn'>Go To Account</NavLink>
                    </div>
                    : 
                    <div>
                        <h4 id='popupTitle'>Sign in with Google</h4>
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