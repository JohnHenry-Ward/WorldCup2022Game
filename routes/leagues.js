/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');

/* Internal Requirements */
const config = require('../config/dev_config.json');

/* Local Variables */
const router = express.Router();

/* Middleware */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

/* MongoDB Models */
const Leagues = require('../models/Leagues');

/* Routes */

/* 
    Route: /leagues
    Method: GET
    Purpose: retrieves all leagues
    Params: none
*/
router.get('/', async (req, res) => {
    const allLeagues = await Leagues.find();
    res.json(allLeagues);
});

/* 
    Route: /leagues/<leagueID>
    Method: GET
    Purpose: retrieves league with ID = leagueID
    Params: ID
*/
router.get('/:ID', async (req, res) => {
    const leagueID = req.params['ID'];
    const league = await Leagues.findOne({ 'leagueID' : leagueID });
    if (league != null) {
        res.json(league);
    } else {
        res.json(
            { 'msg' : `no league with ID: ${leagueID}`,
              'code' : 404
        });
    }
});

/* 
    Route: /leagues/create
    Method: POST
    Purpose: creates a new league, adds to database
    Params: leagueName, leaguePassword, numberOfPlayers
*/
router.post('/create', async (req, res) => {
    const payload = req.body;
    const name = payload['leagueName'];
    const password = payload['leaguePassword'];
    const numberOfPlayers = payload['numberOfPlayers'];
    const leagueID = uuid();
    // user is already logged in (checked client side)
    const cookies = req.cookies;
    const newPlayer = {
        playerName: cookies['userName'],
        playerID: cookies['id']
    };

    const newLeague = new Leagues({
        name,
        password,
        numberOfPlayers,
        leagueID,
        players: newPlayer
    });

    newLeague.save((err, league) => {
        if (err) {
            console.log('Error creating league');
            console.log(err);
        } else {
            console.log('New League successfully created');
            console.log(league);
        }
    });

    res.redirect('/');
});

/* 
    Route: /leagues/join
    Method: POST
    Purpose: join an already existing league
    Params: leagueID, leaguePassword
*/
router.post('/join', async (req, res) => {
    const payload = req.body;
    const tempName = payload['tempName'];
    const leagueID = payload['leagueID'];
    const leaguePassword = payload['leaguePassword'];
    const cookies = req.cookies;
    const newPlayer = {
        playerName: cookies['userName'],
        playerID: cookies['id'],
        isCreator: false
    };

    const result = await Leagues.findOneAndUpdate({ leagueID, leaguePassword }, { $push: { players: newPlayer}});
    console.log(result);
    res.redirect('/');
});

module.exports = router;