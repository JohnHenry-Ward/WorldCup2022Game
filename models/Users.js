const mongoose = require('mongoose');

const schema = mongoose.Schema({
   username: String,
   password: String,
   leagues: [
      {
         id: String,
         name: String
      }
   ]
});

module.exports = mongoose.model('Users', schema);