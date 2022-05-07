/* Libraries */
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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
    fs.readFile(path.resolve(__dirname, '../../db/groupStage.json'), "utf8", (err, data) => {
        if (err) {
            console.log('Error reading Group Stage file');
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;