const mongoose = require('mongoose');

const schema = mongoose.Schema({
   name: String,
   leagueID: String,
   password: String, //will have to be encrypted
   numberOfPlayers: Number,
   players: [
       {
           playerName: String, 
           playerID: String,   //encrpyed?
           isCreator: Boolean,
           teamsID: [String]
       }
   ]
});

module.exports = mongoose.model('Leagues', schema);