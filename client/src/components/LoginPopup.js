/* Libraries */
import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';

/* Internal Requirements */
import '../css/LoginPopup.css';

/* Internval JavaSript */
const popup = require('../js/popup');
const isSignedIn = require('../js/isSignedIn');
const requests = require('../js/requests');

const LoginPopup = ({user, logout, closePopup}) => {

    /* Use State */
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onSubmitLogin = async (e) => {
        e.preventDefault()
        let res = await requests.loginUser(username, password);
        if (res.status === 'error') {
            window.alert('No user found. Make sure you username and password are correct!');
        } else {
            popup.closePopup('#loginPopupBG')
            document.cookie = 'username='+username;
            document.cookie = 'signedIn=true';
            setUsername('');
            setPassword('');
            window.location.reload();
        }
    }

    const onSubmitCreate = async (e) => {
        e.preventDefault()
        console.log(password, confirmPassword);
        if (password !== confirmPassword) {
            window.alert('The passwords do not match!');
        } else {
            let res = await requests.createUser(username, password);
            if (res.status === 'error') {
                window.alert('No user found. Make sure you username and password are correct!');
            }
            else if (res.status === 'duplicate') {
                window.alert('Username is taken, please pick another');
            }
            else {
                popup.closePopup('#createAccountPopupBG')
                document.cookie = 'username='+username;
                document.cookie = 'signedIn=true';
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                window.location.reload();
            }
        }
    }

    return (
        <div>
            <div id="loginPopupBG">
                <div id="loginPopupContent">
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
                            <h4 id='popupTitle'>Sign In</h4>
                            <h5 className='loginCreateSwapBtn' onClick={() => {popup.closePopup('#loginPopupBG'); popup.openPopup('#createAccountPopupBG');}}>Or create an account here!</h5>
                            <form className='loginCreateSwapForm' onSubmit={onSubmitLogin}>
                                <input type='username' name='username' placeholder='Username' required onChange={(e) => setUsername(e.target.value)}></input>
                                <input type='password' name='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)}></input>
                                <input type='submit' value='Login' className='allButtons' id='submitFormBtn'></input>
                            </form>
                        </div>
                    }
                    
                    <button className='allButtons' id='closeBtn' onClick={closePopup}>Close</button>
                </div>
            </div>
            
            <div id="createAccountPopupBG">
                <div id='createAccountPopupContent'>
                    <div>
                        <h4 id='popupTitle'>Create Account</h4>
                        <h5 className='loginCreateSwapBtn' onClick={() => {popup.closePopup('#createAccountPopupBG'); popup.openPopup('#loginPopupBG');}}>Or log in here!</h5>
                        <form className='loginCreateSwapForm' onSubmit={onSubmitCreate}>
                            <input type='username' name='username' placeholder='Username' required onChange={(e) => setUsername(e.target.value)}></input>
                            <input type='password' name='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)}></input>
                            <input type='password' name='confirmPassword' placeholder='Confirm Password' required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                            <input type='submit' value='Create' className='allButtons' id='submitFormBtn'></input>
                        </form>
                    </div>
                    <button className='allButtons' id='closeBtn' onClick={closePopup}>Close</button>
                </div>
            </div>
        </div>
    );

}

export default LoginPopup;