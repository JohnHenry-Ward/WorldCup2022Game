const mongoose = require('mongoose');

const schema = mongoose.Schema({
   name: String,
   leagueID: String,
   password: String, //will have to be encrypted
   numberOfPlayers: Number,
   hasDrafted: Boolean,
   draftDate: {
       type: Date,
       default: null
   },
   players: [
       {
           playerName: String, 
           playerID: String,
           playerNumber: Number,
           isCreator: Boolean,
           teamsID: [String]
       }
   ]
});

module.exports = mongoose.model('Leagues', schema);