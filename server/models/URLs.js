const mongoose = require("mongoose");

const urlschema = new mongoose.Schema({
    original_url: {type: String, required: true},
    shorten_url: {type: String, required: true},
    created_at: {type: Date},
    user_id: {type: Number, required: false},
})

module.exports = mongoose.model("URLs", urlschema);