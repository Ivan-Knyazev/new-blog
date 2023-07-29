const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/new-blog");

const postsSchema = new mongoose.Schema(
    {
        postId: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        text: { type: String, required: true },
        photo: { type: String },
        author: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("posts", postsSchema);

module.exports = Post;
