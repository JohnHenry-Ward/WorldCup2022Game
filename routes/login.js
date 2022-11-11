/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* Internal Requirements */
const Users = require('../models/Users');

/* Local Variables */
const router = express.Router();
let CLIENT_ID = null;
const { OAuth2Client } = require('google-auth-library');
const { response } = require('express');

/* Middleware */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

/* Routes */

/* 
    Route: /login/createuser
    Method: POST
    Purpose: attempts to create a user and logs them in
    Params: none
*/
router.post('/createUser', async (req, res) => {
    const payload = req.body;
    const username = payload['username'];
    const password = payload['password'];
    Users.find({ username: username }, (err, result) => {
        if (err) {
            console.log('Error when finding user')
            console.log(err);
        } else {
            if (result.length === 0) {
                const newUser = new Users({
                    username: username,
                    password: password,
                    leagues: []
                });

                newUser.save((err, user) => {
                    if (err) {
                        console.log('Error adding user to database');
                        console.log(err);
                        res.status(500).json({'status': 'error'});
                    } else {
                        console.log('New user added successfully');
                        console.log(user);
                        res.status(200).json({'status': 'success'});
                    }
                })
            } else {
                console.log('Username exists');
                res.status(200).json({'status': 'duplicate'});
            }
        }
    });
});

/* Routes */

/* 
    Route: /login/loginUser
    Method: POST
    Purpose: attempts to log a user in if they exist
    Params: username, password
*/
router.post('/loginUser', async (req, res) => {
    const payload = req.body;
    const username = payload['username'];
    const password = payload['password'];
    Users.find({ username: username, password: password }, (err, result) => {
        if (err) {
            console.log('Error when finding user')
            console.log(err);
        } else {
            if (result.length === 0) {
                console.log('No user found');
                res.status(404).json({'status': 'error'});
            } else {
                console.log('User has signed in before, no need to add to database');
                res.status(200).json({'status': 'success'});
            }
        }
    });
});

module.exports = router;