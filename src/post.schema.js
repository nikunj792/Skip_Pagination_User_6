const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Sub Document.
const PostSchema = new Schema({
    title: String
});

module.exports = PostSchema;
