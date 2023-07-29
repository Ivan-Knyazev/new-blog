const faker = require(`faker`);

const Post = require("../schemas/Post");
const generator = require("../utils/generator");
const errors = require("../utils/errors");

module.exports.getPosts = async function (req, res) {
    try {
        let posts = await Post.find({}).sort({ updatedAt: -1 }).limit(30);
        res.status(200).json({ status: "ok", posts: posts });
    } catch (error) {
        errors.sendError(res, error);
    }
};

module.exports.getCurrentPost = async function (req, res) {
    let id = String(req.params.id);
    let post;

    if (!isNaN(id)) {
        post = await Post.findOne({ postId: Number(id) });
    } else {
        errors.sendNotFound(res);
        return;
    }

    if (post) {
        res.status(200).json({ status: "ok", post: post });
    } else {
        errors.sendNotFound(res);
    }
};

module.exports.createPost = async function (req, res) {
    let data = req.body;

    let postId = undefined;
    let lastPost = await Post.find({}).sort({ postId: -1 }).limit(1);
    if (lastPost.length != 0) {
        postId = lastPost[0].postId + 1;
    } else {
        postId = 1;
    }

    let newPost = new Post({
        postId: postId,
        title: data.title,
        text: data.text,
        photo: data.photo,
        author: data.author,
    });

    try {
        await newPost.save();
        res.status(200).json({ status: "ok", post: newPost });
    } catch (error) {
        console.log("!-!-!", error);
        errors.sendError(res, error);
    }
};

module.exports.updatePost = async function (req, res) {
    let postId = String(req.query.id);
    let data = req.body;
    let post;

    if (!isNaN(postId)) {
        post = await Post.findOne({ postId: Number(postId) });
    } else {
        errors.sendNotFound(res);
        return;
    }

    post.title = data.title;
    post.text = data.text;
    post.photo = data.photo;
    post.author = data.author;

    try {
        await post.save();
        res.status(200).json({ status: "ok", post: post });
    } catch (error) {
        console.log("!-!-!", error);
        errors.sendError(res, error);
    }
};

module.exports.deletePost = async function (req, res) {
    let postId = String(req.query.id);
    let post;

    try {
        post = await Post.findOne({ postId: Number(postId) });
    } catch (error) {
        errors.sendNotFound(res);
    }

    try {
        post = await Post.deleteOne({ postId: Number(postId) });
        res.status(200).json({ status: "ok", post: post });
    } catch (error) {
        errors.sendError(res, error);
    }
};

module.exports.generatePost = async function (req, res) {
    let newPosts = [];
    let count = req.query.count;
    if (!count) {
        count = 1;
    }

    for (let i = 0; i < count; i++) {
        let postId = undefined;
        let lastPost = await Post.find({}).sort({ postId: -1 }).limit(1);
        if (lastPost.length != 0) {
            postId = lastPost[0].postId + 1;
        } else {
            postId = 1;
        }
        // console.log(lastPost, postId);

        const title = faker.lorem.words(5);
        let text = "";
        while (text.length < 550) {
            text = await faker.lorem.text();
        }
        categories = [
            "cat",
            "city",
            "business",
            "transport",
            "food",
            "cars",
            "technics",
            "people",
            "sport",
        ];
        thems = [];
        for (let i = 0; i < 3; i++) {
            thems.push(
                categories[generator.getRandomInt(0, categories.length)]
            );
        }
        const photo = await generator.getImage(thems);
        // const photo = faker.image.image();
        // const photo = faker.image.technics();

        const author = faker.name.firstName();

        let newPost = new Post({
            postId: postId,
            title: title,
            text: text,
            photo: photo,
            author: author,
        });
        try {
            await newPost.save();
            newPosts.push(newPost);
        } catch (error) {
            console.log("!-!-!", error);
        }
    }

    if (newPosts.length == count) {
        res.status(201).json({ status: "ok", posts: newPosts });
    } else {
        res.status(500).json({
            status: "server error",
            error: error,
            posts: newPosts,
        });
    }
};
