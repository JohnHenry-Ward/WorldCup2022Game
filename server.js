/* Libraries */
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

/* Internal requirements */
const config = require('./config/dev_config.json');
const teams = require('./routes/teams');
const leagues = require('./routes/leagues');
const login = require('./routes/login');
const users = require('./routes/users');
const fixtures = require('./routes/api/fixtures');
const groupStage = require('./routes/api/groupStage');

/* Local variables */
const app = express();
const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.use('/teams', teams);
app.use('/leagues', leagues);
app.use('/login', login);
app.use('/users', users);
app.use('/api/fixtures', fixtures);
app.use('/api/groupStage', groupStage);

/* Connect to MongoDB Database */
mongoose.connect(config['mongoURI'], { useNewUrlParser : true }, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
});

/* Start the server */
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});