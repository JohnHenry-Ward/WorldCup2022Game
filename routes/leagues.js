/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');

/* Local Variables */
const router = express.Router();

/* Middleware */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

/* MongoDB Models */
const Leagues = require('../models/Leagues');
const Users = require('../models/Users');

/* Helpers */

const playerAlreadyInLeague = (league, playerID) => {
    for(let i = 0; i < league.players.length; i++) {
        if (league.players[i].playerID == playerID) {
            return true;
        }
    }
    return false;
}

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
    Params: leagueName, leaguePassword, numberOfPlayers, draftDate
*/
router.post('/create', async (req, res) => {
    const payload = req.body;
    const name = payload['leagueName'];
    const password = payload['leaguePassword'];
    const draftDate = payload['draftDate'];
    const leagueID = uuid();
    // user is already logged in (checked client side)
    const cookies = req.cookies;
    const newPlayer = {
        playerName: cookies['username'],
        playerID: cookies['username'],
        isCreator: true,
        playerNumber: 0
    };

    // create the league
    const newLeague = new Leagues({
        name,
        password,
        numberOfPlayers: 1,
        leagueID,
        players: newPlayer,
        draftDate: new Date(draftDate)
    });

    newLeague.save((err, league) => {
        if (err) {
            console.log('Error creating league');
        } else {
            console.log('New League successfully created');
        }
    });

    // add the league to the users document
    const result = await Users.findOneAndUpdate({ 'id' : cookies['id'] }, { $push: { leagues: { id: leagueID, name: name } }});

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
    const password = payload['leaguePassword'];
    const cookies = req.cookies;

    // find the league first
    Leagues.find({leagueID, password}, (err, doc) => {
        if (err) {
            console.log('Error finding league');
        } else {
            const currLeague = doc[0];
            if (currLeague == null) {
                console.log('This league does not exist');
                res.json({
                    'status': 'error',
                    'msg': 'This league does not exist. Check the ID and password'
                });
            } else if (currLeague.numberOfPlayers == 8) {
                console.log('League already has max amount of players');
                res.json({
                    'status': 'error',
                    'msg': 'This league already has the max amount of players (8)'
                })
            } else if (playerAlreadyInLeague(currLeague, cookies['username'])) {
                console.log('Player is already in the league')
                res.json({
                    'status': 'error',
                    'msg': 'You are already in this league'
                })
            } else if (currLeague.draft.hasDrafted) {
                console.log('League has already drafted!')
                res.json({
                    'status': 'error',
                    'msg': 'This league has already drafted'
                })
            } else {
                const newPlayer = {
                    playerName: cookies['username'],
                    playerID: cookies['username'],
                    playerNumber: currLeague.numberOfPlayers, // don't need to add 1 since we start at 0
                    isCreator: false
                };

                // add user to the league
                Leagues.findOneAndUpdate({leagueID, password, 'players.playerID': {$ne: cookies['username']}}, 
                                        {$inc: {numberOfPlayers: 1}, $addToSet: {players: newPlayer}},
                                        (err, doc) => {
                                            if (err) {
                                                console.log('Error adding user to league');
                                            } else {
                                                console.log('User added to league!')
                                            }
                                        });

                //add league to user
                Users.findOneAndUpdate({'username' : cookies['username'], 'leagues.id': {$ne: leagueID}}, 
                                        {$addToSet: { leagues: { id: leagueID, name: currLeague.name }}},
                                        (err, doc) => {
                                            if (err) {
                                                console.log('Error adding league to user')
                                            } else {
                                                console.log('League added to user!');
                                            }
                                        });

                res.redirect('/');
            }
        }
    });
});

/* 
    Route: /leagues/startDraft
    Method: POST
    Purpose: start a draft
    Params: leagueID
*/

/* Below Routes Pertain to the Draft Process */

router.post('/startDraft', async (req, res) => {
    const payload = req.body;
    const leagueID = payload['leagueID'];
    const order = payload['order'];
    const totalPicks = payload['totalPicks'];
    Leagues.findOneAndUpdate({leagueID}, {"draft.draftStatus": 'LIVE', "draft.draftOrder": order, "draft.pickStatus.totalPicks": totalPicks},
        (err, doc) => {
            if (err) {
                console.log('Error starting draft');
                res.json({
                    'status': 'error',
                    'msg': 'Error starting draft'
                })
            } else {
                console.log('Draft started');
                res.json({
                    'status': 'success',
                    'msg': 'Draft started succesfully'
                })
            }
        });
});

router.post('/endDraft', async (req, res) => {
    const payload = req.body;
    const leagueID = payload['leagueID']
    Leagues.findOneAndUpdate({leagueID}, {"draft.draftStatus": "POST", "draft.hasDrafted": true},
        (err, doc) => {
            if (err) {
                console.log('Error ending draft');
                res.json({
                    'status': 'error',
                    'msg': 'Error ending draft'
                })
            } else {
                console.log('Draft ended');
                res.json({
                    'status': 'success',
                    'msg': 'Draft ended succesfully'
                })
            }
        });
});

router.post('/pickConfirm', async (req, res) => {
    const payload = req.body;
    const leagueID = payload['leagueID']; // only need league ID, since they've already joined the league
    const team = payload['team']
    const playerNumber = payload['playerNumber']

    Leagues.findOneAndUpdate({leagueID}, 
        {
            $inc: {'draft.pickStatus.currentPick': 1},
            $addToSet: {[`players.${playerNumber}.teamsID`]: team}
        }, 
        (err, doc) => {
            if (err) {
                console.log('Error updating draft for draft pick');
                res.json({
                    'status': 'error',
                    'msg': 'Error updating league for most recent draft pick'
                })
            } else {
                console.log('Pick Saved!');
                res.json({
                    'status': 'success',
                    'msg': 'Pick successfully saved'
                })
            }
        });
});

module.exports = router;