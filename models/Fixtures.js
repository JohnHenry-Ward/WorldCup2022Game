const mongoose = require('mongoose');

// Raw JSON
const schema = mongoose.Schema({
    fixtures: {
        type: Array
    }
});

module.exports = mongoose.model('Fixtures', schema);