const axios = require('axios');
const mongoose = require('mongoose');
const fs = require('fs');

const Fixtures = require('./models/Fixtures');
const Groups = require('./models/Groups');

if (process.env.NODE_ENV !== 'production') {
    const config = require('./config/dev_config.json');
    rapidKey = config['RapidKey'];
    mongoURI = config['mongoURI'];
} else {
    rapidKey = process.env.rapidKey;
    mongoURI = process.env.mongoURI;
}


/* Connect to MongoDB Database */
mongoose.connect(mongoURI, { useNewUrlParser : true }, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
});

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
    try{
        Fixtures.findOneAndReplace({"id": "1"}, {
            fixtures: doc
        });
        console.log("Wrote Fixtures");
    } catch(e) {
        console.log("Error writing Fixtures");
        console.log(e)
    }
})
.catch((error) => {
    console.log('Failed to get the fixtures');
});

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
    try{
        Groups.findOneAndReplace({"id": "1"}, {
            groups: doc
        });
        console.log("Wrote Groups")
    } catch(e) {
        console.log("Error writing Groups");
        console.log(e);
    }
})
.catch((error) => {
    console.log('Failed to get the group stage');
    console.log(error.response);
});