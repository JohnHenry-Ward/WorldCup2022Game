/* Libraries */
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/* Local Variables */
const router = express.Router();
const Groups = require('../../models/Groups');

/* Routes */

/* 
    Route: /groupStage
    Method: GET
    Purpose: retrieves all current fixtures
    Params: none
*/
router.get('/', (req, res) => {
    Groups.findOne({'id': '1'}, (err, doc) => {
        if (err) {
            console.log("Error getting groups");
            console.log(err)
        } else {
            console.log("Successfully got groups");
            res.json(doc['groups']);
        }
    })
});

module.exports = router;