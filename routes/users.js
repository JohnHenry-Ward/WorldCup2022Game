/* Libraries */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* Internal Requirements */
const Users = require('../models/Users');

/* Local Variables */
const router = express.Router();
let CLIENT_ID = null;

/* Middleware */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
    const config = require('../config/dev_config.json');
    CLIENT_ID = config.GoogleClientID;
} else {
    CLIENT_ID = process.env.googleClientId;
}

/* Routes */

/* 
    Route: /users/<ID>
    Method: GET
    Purpose: gets the users information based on the email given
    Params: ID (user email)
*/
router.get('/:ID/', async (req, res) => {
    const username = req.params['ID'];
    const user = await Users.findOne({ 'username' : username });
    if (user != null) {
        res.json(user);
    } else {
        res.json(
            { 'msg' : `no user with email: ${username}`,
            'code' : 404
            }
        )
    }
});


module.exports = router;