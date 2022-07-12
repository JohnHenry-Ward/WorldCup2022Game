/* Libraries */
import React, { useState } from "react";

/* Internal Requirements */
const countdown = require('../js/countdown');

const Timer = ({countingTo, text}) => {

    /* Use States */
    const [timeTilKick, setTimeTilKick] = useState(countdown.countdown(countingTo));

    // Countdown timer
    setInterval(() => {
        let ret = countdown.countdown(countingTo);
        setTimeTilKick(ret);
    }, 1000);

    return (
            
            <div className='countdown-wrapper'>
                <div className='countdown'>
                    <p className='time'>{timeTilKick['days']} <span className='type'>Days</span></p>
                    <p className='time'>{timeTilKick['hours']} <span className='type'>Hours</span></p>
                    <p className='time'>{timeTilKick['minutes']} <span className='type'>Minutes</span></p>
                    <p className='time'>{timeTilKick['seconds']} <span className='type'>Seconds</span></p>
                </div>
                <p className='subtitle'>{text}</p>
            </div>
        
    );
}

export default Timer;