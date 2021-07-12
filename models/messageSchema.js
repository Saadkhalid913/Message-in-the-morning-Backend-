const mongoose = require("mongoose")

// TODO: test this schema and add routes 

const messageSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId},
    title: String, 
    body: String,
    link: String,
    timeCreated: {type: Date, default: Date.now()}
})

module.exports = messageSchema