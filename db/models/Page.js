const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = new Schema({
    title: { type: String , index: { unique: true }},
    description: { type: String },
    image: { type: String },
    showOnMenu: { type: Boolean, default: false },
    showOnFront: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});


module.exports =  mongoose.model("Page", PageSchema);