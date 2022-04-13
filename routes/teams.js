/* Libraries */
const express = require('express');

/* Internal Requirements */
const config = require('../config/dev_config.json');

/* Local Variables */
const router = express.Router();

/* MongoDB Models */
const Teams = require('../models/Teams');

/* Routes */

/* 
    Route: /teams
    Method: GET
    Purpose: retrieves all teams
    Params: none
*/
router.get('/', async (req, res) => {
    const allTeams = await Teams.find();
    res.json(allTeams);
});

/* 
    Route: /teams/<teamID>
    Method: GET
    Purpose: retrieve teams with ID = teamID
    Params: ID
*/
router.get('/:ID', async (req, res) => {
    const teamID = req.params['ID'];
    const team = await Teams.findOne({ 'nameAbbr' : teamID });
    if (team != null) {
        res.json(team);
    } else {
        res.json(
            { 'msg' : `no team with ID: ${teamID}`,
              'code' : 404
        });
    }
});

module.exports = router;