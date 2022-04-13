const mongoose = require('mongoose');

const schema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    group: {
        type: String,
        required: true
    },
    design: {
        colors: {
            type: [String]
        },
        flag: {
            type: String, //path to img
            required: true
        }
    }
});

module.exports = mongoose.model('Teams', schema);