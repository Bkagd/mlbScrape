const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;