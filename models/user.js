const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    employeName: { type: String },
    centerName: { type: String },
    disease: { type: String }
});

module.exports = mongoose.model('User', userSchema);
