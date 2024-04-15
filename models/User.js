const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, trim: true, lowercase: true, required: true},
    password: {type: String, trim: true, required: true},
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)