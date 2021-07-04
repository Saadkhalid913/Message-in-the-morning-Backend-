const mongoose = require("mongoose")

const emailTemplateSchema = new mongoose.Schema({
    subject: String,
    body: String
})

module.exports = emailTemplateSchema;
