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

/* Middleware */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

/* Routes */

/* 
    Route: /users/<ID>
    Method: GET
    Purpose: gets the users information based on the email given
    Params: ID (user email)
*/
router.get('/:ID/', async (req, res) => {
    const id = req.params['ID'];
    const user = await Users.findOne({ 'id' : id });
    if (user != null) {
        res.json(user);
    } else {
        res.json(
            { 'msg' : `no user with email: ${id}`,
            'code' : 404
            }
        )
    }
});


module.exports = router;