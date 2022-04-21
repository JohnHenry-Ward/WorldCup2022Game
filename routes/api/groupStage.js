/* Libraries */
const express = require('express');
const axios = require('axios');

/* Internal Requirements */
const config = require('../../config/dev_config.json');

/* Local Variables */
const router = express.Router();

/* Routes */

/* 
    Route: /groupStage
    Method: GET
    Purpose: retrieves all current fixtures
    Params: none
*/
router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
        params: {
            league: 1,
            season: 2022
        },
        headers: {
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            'X-RapidAPI-Key': config['RapidKey']
          }
    })
    .then((doc) => {
        console.log('Successfully got the group stage');
        res.json(doc.data);
    })
    .catch((error) => {
        console.log('Failed to get the group stage');
        console.log(error);
    });
});

module.exports = router;