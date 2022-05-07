/* Requirements */
import React, { useEffect, useState } from 'react';

/* Components */
import Header from './components/Header';
import Leagues from './components/Leagues';
import Button from './components/Button';
import CreateLeague from './components/CreateLeague';
import JoinLeague from './components/JoinLeague';

/* Internal Requirements */
import './css/App.css';

/* Internval JavaSript */
const isSignedIn = require('./js/isSignedIn');
const getCookies = require('./js/getCookies');
const requests = require('./js/requests');
const popup = require('./js/popup');
const countdown = require('./js/countdown');

const App = () => {

  /* Use States */
  const [allLeagues, setAllLeagues] = useState([]);
  const [user, setUser] = useState('');
  const [signIn, setSignIn] = useState(false);
  const [timeTilKick, setTimeTilKick] = useState(countdown.countdown());

  /* Use Effects */
  useEffect(() => {
    setSignIn(isSignedIn.isSignedIn());
  }, []);

  useEffect(() => {
    const userSignedIn = isSignedIn.isSignedIn();
    if (userSignedIn === true) {
      const cookies = getCookies.getCookies();
      setUser(cookies['userName']);
    } else {
      setUser('');
    }
  }, [signIn]);

  useEffect(async () => {
    const userSignedIn = isSignedIn.isSignedIn();
    if (userSignedIn === true) {
      const leagues = await requests.getLeagues(getCookies.getCookies()['id']);
      setAllLeagues(leagues);
    } else {
      setAllLeagues([]);
    }
  }, [signIn]);

  // Countdown timer
  setInterval(() => {
    let ret = countdown.countdown();
    setTimeTilKick(ret);
  }, 1000);
  
  return (
    <div className="App">
      <CreateLeague closePopup={(e) => popup.closePopup('#createPopup')}/>
      <JoinLeague closePopup={(e) => popup.closePopup('#joinPopup')} />
      <Header user={user} setSignIn={setSignIn}/>
      <div className='countdown-wrapper'>
        <div className='countdown'>
          <p className='time'>{timeTilKick['days']} <span className='type'>Days</span></p>
          <p className='time'>{timeTilKick['hours']} <span className='type'>Hours</span></p>
          <p className='time'>{timeTilKick['minutes']} <span className='type'>Minutes</span></p>
          <p className='time'>{timeTilKick['seconds']} <span className='type'>Seconds</span></p>
        </div>
        <p className='subtitle'>Until Kickoff!</p>
      </div>
      
      <div className='liveScoreboard'> livescores{/*maybe a widget*/}</div>
      <div className='leagueBtnWrapper'>
        <Button text='Create A League' className='leagueCreateJoinBTN' onClick={(e) => popup.openPopup('#createPopup')}/>
        <Button text='Join A League' className='leagueCreateJoinBTN' onClick={(e) => popup.openPopup('#joinPopup')}/>
      </div>
      <h4 className='leaguesTitle'>Your Leagues</h4>
      <Leagues allLeagues={allLeagues} />

      {/* maybe move all popups to its own component? */}
      <div className='popupBG' id='joinError'>
        <div className='content'>
          <h1 className='text'></h1>
          <button className='createJoinBTN' onClick={(e) => popup.closePopup('#joinError')}>Cancel</button>
        </div>
      </div>

    </div>
  );
}

export default App;