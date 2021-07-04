const mongoose = require("mongoose")

const emailTemplateSchema = new mongoose.Schema({
    name: String,
    subject: String,
    body: String
})

module.exports = emailTemplateSchema;
