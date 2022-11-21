/* Libraries */
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/* Local Variables */
const router = express.Router();
const Fixtures = require('../../models/Fixtures');

/* Routes */

/* 
    Route: /fixtures
    Method: GET
    Purpose: retrieves all current fixtures
    Params: none
*/
router.get('/', (req, res) => {
    Fixtures.findOne({'id': '1'}, (err, doc) => {
        if (err) {
            console.log("Error getting fixtures");
            console.log(err)
        } else {
            console.log("Successfully got fixtures");
            res.json(doc);
        }
    })
});

module.exports = router;