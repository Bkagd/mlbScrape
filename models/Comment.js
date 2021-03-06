const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;