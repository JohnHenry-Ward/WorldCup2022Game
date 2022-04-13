/* Requirements */
import React, { useState } from 'react';

/* Other Components */
import Header from "../components/Header";

/* Internval JavaSript */
const getCookies = require('../js/getCookies');

const Account = () => {
    /* Use States */
    const [user, setUser] = useState(getCookies.getCookies()['userName']);

    return (
        <main>
            <Header user={user}/>
            <h1>Account</h1>
        </main>
    );
}

export default Account;