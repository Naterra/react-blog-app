const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ModelIncrement = require("./ModelIncrement");

const PageSchema = new Schema({
    id: { type: Number ,  default: 0},
    title: { type: String , index: { unique: true }},
    description: { type: String },
    image: { type: String },
    showOnMenu: { type: Boolean, default: false },
    showOnFront: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});



PageSchema.pre('save', async function(next) {

    if (this.isNew) {
        const id = await _ModelIncrement.getNextId('Page');
        // console.log('> new id', id);

        this.id = id; // Incremented
        next();
    } else {
        next();
    }
});


module.exports =  mongoose.model("Page", PageSchema);