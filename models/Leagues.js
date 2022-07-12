const mongoose = require('mongoose');

const schema = mongoose.Schema({
   name: String,
   leagueID: String,
   password: String, //will have to be encrypted
   numberOfPlayers: Number,
   draft: {
       hasDrafted: {
           type: Boolean,
           default: null
       },
       draftDate: {
           type: Date,
           default: null
       },
       draftOrder: { //this will be a n length array where n is the number of players in the league, populated with playerNumber's
           type: Array,
           default: null
       },
       currentDrafter: {
           type: Number, // this will be a playerNumber
           default: null
       },
       pickStatus: {
           currentPick: {
               type: Number,
               default: 1
           },
           maxPicks: {
               type: Number,
               default: 32
            }
        }
   },
   players: [
       {
           playerName: String, 
           playerID: String,
           playerNumber: Number,
           pickNumber: Number,
           isCreator: Boolean,
           teamsID: [String]
       }
   ]
});

module.exports = mongoose.model('Leagues', schema);