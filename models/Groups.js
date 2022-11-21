const mongoose = require('mongoose');

// Raw JSON
const schema = mongoose.Schema({
    groups: {
        type: Array
    },
    id: {
        type: String,
        default: "1"
    }
});

module.exports = mongoose.model('Groups', schema);