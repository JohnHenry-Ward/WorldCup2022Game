const mongoose = require('mongoose');

const schema = mongoose.Schema({
   name: String,
   id: String,
   leagues: [
      {
         id: String,
         name: String
      }
   ]
});

module.exports = mongoose.model('Users', schema);