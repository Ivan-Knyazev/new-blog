const mongoose = require("./db");

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
