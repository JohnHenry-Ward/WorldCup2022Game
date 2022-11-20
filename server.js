/* Libraries */
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cron = require('node-cron');

/* Internal requirements */
const teams = require('./routes/teams');
const leagues = require('./routes/leagues');
const login = require('./routes/login');
const users = require('./routes/users');
const fixtures = require('./routes/api/fixtures');
const groupStage = require('./routes/api/groupStage');

/* Local variables */
const app = express();
const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.use('/teams', teams);
app.use('/leagues', leagues);
app.use('/login', login);
app.use('/users', users);
app.use('/api/fixtures', fixtures);
app.use('/api/groupStage', groupStage);

/* Cron Jobs */
groups_CRON = "1,31 4,7,10,13 * 11,12 *";
fixtures_CRON = "0,15,30,45 2,3,4,5,6,7,8,9,10,11,12,13 * 11,12 *";
every_min_CRON = "* * * * *";
never_CRON = "0 0 29 2 1";

let mongoURI = null;
let rapidKey = null;

if (process.env.NODE_ENV !== 'production') {
    const config = require('./config/dev_config.json');
    mongoURI = config['mongoURI'];
    rapidKey = config['RapidKey'];
} else {
    mongoURI = process.env.mongoURI;
    rapidKey = process.env.rapidKey;
    app.use(express.static('client/build'));
}

/* Connect to MongoDB Database */
mongoose.connect(mongoURI, { useNewUrlParser : true }, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
});

/* Update scores every 5 minutes in hour 4, 7, 10, 13 in November/December */
cron.schedule(never_CRON, () => {
    
    // Request Scores and write them to ./db/fixtures.json
    console.log('Attempting to fetch updated fixtures');
    axios({
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
            league: 1,
            season: 2022
        },
        headers: {
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            'X-RapidAPI-Key': rapidKey
            }
    })
    .then((doc) => {
        console.log('Successfully got the fixtures');
        fs.writeFile('./db/fixtures.json', JSON.stringify(doc.data.response), (err) => {
            if (err) {
                console.log('Error writing Fixtures to internal db');
            } else {
                console.log('Fixtures data written succesfully');
            }
        })
    })
    .catch((error) => {
        console.log('Failed to get the fixtures');
    });

});

/* Update standings at 4:31, 7:31, 10:31, 13:31 in November/December */
cron.schedule(never_CRON, () => {

    // Request Group Stage standings, Write them to ./db/groupStage.json
    console.log('Attempting to fetch updated Group Stage');
    axios({
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
        params: {
            league: 1,
            season: 2022
        },
        headers: {
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            'X-RapidAPI-Key': rapidKey
        }
    })
    .then((doc) => {
        console.log('Successfully got the group stage');
        fs.writeFile('./db/groupStage.json', JSON.stringify(doc.data.response), (err) => {
            if (err) {
                console.log('Error writing Group Stage to internal db');
            } else {
                console.log('Group Stage data written successfully');
            }
        })
    })
    .catch((error) => {
        console.log('Failed to get the group stage');
        console.log(error.response);
    });
});

/* Start the server */
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});