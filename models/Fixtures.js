const mongoose = require('mongoose');

// Raw JSON
const schema = mongoose.Schema({
    fixtures: {
        type: Array
    },
    id: {
        type: String,
        default: "1"
    }
});

module.exports = mongoose.model('Fixtures', schema);