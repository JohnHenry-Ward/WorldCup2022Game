const mongoose = require('mongoose');

// Raw JSON
const schema = mongoose.Schema({
    groups: {
        type: Array
    }
});

module.exports = mongoose.model('Groups', schema);