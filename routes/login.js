/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* Internal Requirements */
const config = require('../config/dev_config.json');
const Users = require('../models/Users');

/* Local Variables */
const router = express.Router();
const CLIENT_ID = config.GoogleClientID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

/* Middleware */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

/* Routes */

/* 
    Route: /login
    Method: POST
    Purpose: attempts to log a user in (putting their login info in cookies)
    Params: none
*/
router.post('/', async (req, res) => {
    verify(req.body.credential)
        .then(payload => {
            // check if the user is in the DB
            const email = payload['email'];
            const name = payload['given_name'];
            res.cookie('signedIn', true);
            res.cookie('userName', name);
            res.cookie('id', email);

            Users.find({ id: email }, (err, result) => {
                if (err) {
                    console.log('Error when finding user')
                    console.log(err);
                } else {
                    if (result.length === 0) {
                        const newUser = new Users({
                            name: name,
                            id: email,
                            leagues: []
                        });

                        newUser.save((err, user) => {
                            if (err) {
                                console.log('Error adding user to database');
                                console.log(err);
                            } else {
                                console.log('New user added successfully');
                                console.log(user);
                            }
                        })
                    } else {
                        console.log('User has signed in before, no need to add to database');
                    }
                }
            });
            res.redirect('http://localhost:3000/'); //better way to do this?
        })
        .catch(e => {
            console.log(e);
            res.send('ERROR');
        });
});

/* Function to verify and decode JWT */
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    return ticket.getPayload();
}

module.exports = router;