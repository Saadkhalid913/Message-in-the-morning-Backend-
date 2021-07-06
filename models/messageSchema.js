const mongoose = require("mongoose")

// TODO: test this schema and add routes 

const messageSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId},
    title: String, 
    body: String,
    link: String,
    timeCreated: {type: Date, default: Date.now(), immutable: true},
    timeToSend: {type: Date, default: setSendDate(), immutable:true}
})


function setSendDate() {    
    // returns the UTC time of 8:00am 
    // for the next 
    // R-type: Date()
    let now  = new Date();
    if (now.getHours < 8) {
        now.setDate(now.getDate())
        now.setHours(8);
        now.setMinutes(0);
        now.setMilliseconds(0);
        return now
    }
    else {
        now.setDate(now.getDate() + 1)
        now.setHours(8);
        now.setMinutes(0);
        now.setMilliseconds(0);
        return now
    }
}

module.exports = messageSchema