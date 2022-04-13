/* Requirements */
import React, { useEffect, useState } from 'react';

/* Components */
import Header from './components/Header';
import Leagues from './components/Leagues';
import Button from './components/Button';
import GooglePopup from './components/GooglePopup';
import CreateLeague from './components/CreateLeague';
import JoinLeague from './components/JoinLeague';

/* Internal Requirements */
import './css/App.css';

/* Internval JavaSript */
const isSignedIn = require('./js/isSignedIn');
const getCookies = require('./js/getCookies');

const App = () => {

  /* Use States */
  const [allLeagues, setAllLeagues] = useState([]);
  const [user, setUser] = useState('');
  const [signIn, setSignIn] = useState(false);

  /* Use Effects */
  useEffect(() => {
    setSignIn(isSignedIn.isSignedIn());
  }, []);

  useEffect(() => {
    if (signIn === true) {
      const cookies = getCookies.getCookies();
      setUser(cookies['userName']);
    } else {
      setUser('');
    }
  }, [signIn]);

  useEffect(() => {
    const userSignedIn = isSignedIn.isSignedIn();
    if (userSignedIn === true) {
      //temp
      setAllLeagues([
        {
          "leagueName": "league1",
          "leagueID": "123"
        },
        {
          "leagueName": "league2",
          "leagueID": "345"
        },
        {
          "leagueName": "league3",
          "leagueID": "347"
        }
      ]);
    } else {
      setAllLeagues([]);
    }
  }, [signIn]);

  /* Helper functions */

  const closePopup = (target) => {
    const popup = document.querySelector(target);
    popup.style.display = 'None';
  }

  const logout = () => { //incomplete
    getCookies.clearCookies();
    setSignIn(false);
    closePopup('#googleLoginPopupBG');
  }

  const openCreateLeaguePopup = () => {
    if (isSignedIn.isSignedIn()) {
      const popup = document.querySelector('#createPopup');
      popup.style.display = 'flex';
    } else {
      //will add a popup window
      console.log('You must be signed in to create a league');
    }
  }

  const openJoinLeaguePopup = () => {
    if (isSignedIn.isSignedIn()) {
      const popup = document.querySelector('#joinPopup');
      popup.style.display = 'flex';
    } else {
      //will add a popup window
      console.log('You must be signed in to join a league');
    }
  }
  
  return (
    <div className="App">
      <GooglePopup user={user} logout={logout} closePopup={(e) => closePopup('#googleLoginPopupBG')}/>
      <CreateLeague closePopup={(e) => closePopup('#createPopup')}/>
      <JoinLeague closePopup={(e) => closePopup('#joinPopup')} />
      <Header user={user}/>
      <div className='liveScoreboard'> livescores{/*maybe a widget*/}</div>
      <div className='leagueBtnWrapper'>
        <Button text='Create A League' className='leagueCreateJoinBTN' onClick={openCreateLeaguePopup}/>
        <Button text='Join A League' className='leagueCreateJoinBTN' onClick={openJoinLeaguePopup}/>
      </div>
      <h4 className='leaguesTitle'>Your Leagues</h4>
      <Leagues allLeagues={allLeagues}/>
    </div>
  );
}

export default App;