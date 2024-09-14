const mongoose = require('mongoose');

// Define SightDetail Schema
const SightDetailSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    deviceSerialNumber: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    centerID: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    centerName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SightDetail', SightDetailSchema);
