const axios = require('axios');
const fs = require('fs');

if (process.env.NODE_ENV !== 'production') {
    const config = require('./config/dev_config.json');
    rapidKey = config['RapidKey'];
} else {
    rapidKey = process.env.rapidKey;
}

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