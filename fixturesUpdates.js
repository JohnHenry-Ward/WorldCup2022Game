const axios = require('axios');
const mongoose = require('mongoose');
const fs = require('fs');

const Fixtures = require('./models/Fixtures');
const Groups = require('./models/Groups');
const { group } = require('console');
const { response } = require('express');

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
        fixtureRequest();
    }
});
const fixtureRequest = async () => {
    // Request Scores and write them to mongodb
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
        let x = doc.data.response;
        try{
            Fixtures.findOneAndUpdate({}, {
                fixtures: x
            }, (err, i) => {
                if (err) {
                    console.log(err);
                    console.log("Error");
                } else {
                    console.log("Success");
                }
            });
            console.log("Wrote Fixtures");
        } catch(e) {
            console.log("Error writing Fixtures");
            console.log(e)
        }
        mongoose.disconnect();
    })
    .catch((error) => {
        console.log('Failed to get the fixtures');
        mongoose.disconnect();
    });
}