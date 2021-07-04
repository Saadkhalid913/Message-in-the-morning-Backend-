const mongoose = require("mongoose");

const sentEmailSchema = new mongoose.Schema({
    sender: mongoose.Schema.Types.ObjectId,
    recipients: [Object],
    subject: String,
    body: String
})

module.exports= sentEmailSchema;
