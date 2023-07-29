const express = require("express");
const router = express.Router();
const faker = require(`faker`);

const Post = require("../schemas/Post");
const post = require("../controllers/post");
const generator = require("../utils/generator");
const errors = require("../utils/errors");

router.get("/posts", post.getPosts);

router.get("/post/:id", post.getCurrentPost);

router.post("/create", post.createPost);

router.post("/update", post.updatePost);

router.get("/delete", post.deletePost);

router.get("/posts/generate", post.generatePost);

module.exports = router;
