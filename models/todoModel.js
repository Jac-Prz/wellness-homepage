const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    list: {
        type: String,
        required: true
    }
}, { timestamps: true }); // timestamp of when it was created and when it was updated

//model, based on schema, that we export
module.exports = mongoose.model('TodoItem', todoSchema);

//TodoItem.find() etc