/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* Internal Requirements */
const config = require('../config/dev_config.json');

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
            const name = payload['given_name'];
            const email = payload['email'];
            const id = payload['jti'];
            res.cookie('signedIn', true);
            res.cookie('userName', name);
            res.cookie('id', id);
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