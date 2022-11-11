/* Requirements */
import React from 'react';

/* Other Components */
import Header from "../components/Header";

/* Internval JavaSript */
const getCookies = require('../js/getCookies');

const Account = () => {
    
    return (
        <div className='Account'>
            <Header user={getCookies.getCookies()['username']} />
            <h1>Account</h1>
        </div>
    );
}

export default Account;