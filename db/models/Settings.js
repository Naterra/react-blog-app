const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    name: { type: String , index: { unique: true }},
    param: { type: Object }
});


module.exports =  mongoose.model("Settings", SettingsSchema);