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
const Users = require('../models/Users');

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

    // create the league
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
            // console.log(league);
        }
    });

    // add the league to the users document
    const result = await Users.findOneAndUpdate({ 'id' : cookies['id'] }, { $push: { leagues: { id: leagueID, name: name } }});
    console.log(result);

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
    const leagueID = payload['leagueID'];
    const leaguePassword = payload['leaguePassword'];
    const cookies = req.cookies;
    const newPlayer = {
        playerName: cookies['userName'],
        playerID: cookies['id'],
        isCreator: false
    };

    // add user to the league
    Leagues.findOneAndUpdate({leagueID, leaguePassword, 'players.playerID': {$ne: cookies['id']}}, 
                             {$addToSet: {players: newPlayer}});


    // add league to user (this can be cleaned up)
    Leagues.find({leagueID, leaguePassword}, (err, doc) => {
        if (err) {
            console.log('Error adding league to user');
        } else {
            console.log('attempting to add league to user');
            console.log(doc[0].name);
            Users.findOneAndUpdate({'id' : cookies['id'], 'leagues.id': {$ne: leagueID}}, 
                                    {$addToSet: { leagues: { id: leagueID, name: doc[0].name }}},
                                    (err, doc) => {
                                        if (err) {
                                            console.log('Error adding league to user')
                                        } else {
                                            console.log('success!');
                                        }
                                    });
        }
    });

    res.redirect('/');
});

module.exports = router;