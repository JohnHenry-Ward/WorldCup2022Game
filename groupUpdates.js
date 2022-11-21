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
    }
});

const groupRequest = async () => {
    // Request Group Stage standings, Write them to mongodb
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
        let x = doc.data.response;
        try{
            Groups.findOneAndUpdate({}, {
                groups: x
            }, (err, i) => {
                if (err) {
                    console.log(err);
                    console.log("Error");
                } else {
                    console.log(i);
                    console.log("Success");
                }
            });
            console.log("Wrote Groups");
        } catch(e) {
            console.log("Error writing Groups");
            console.log(e)
        }
    })
    .catch((error) => {
        console.log('Failed to get the group stage');
        console.log(error.response);
    });
}

groupRequest();