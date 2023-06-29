let express = require(`express`);
const axios = require("axios").default;
let faker = require(`faker`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/new-blog");

let postsSchema = new mongoose.Schema(
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

let Post = mongoose.model("posts", postsSchema);

sendError = (res, error) => {
    res.status(500).json({ status: "server error", error: error });
};
sendNotFound = (res) => {
    res.status(404).json({ status: "not found" });
};

app.get("/posts", async function (req, res) {
    try {
        let posts = await Post.find({}).sort({ updatedAt: -1 }).limit(30);
        res.status(200).json({ status: "ok", posts: posts });
    } catch (error) {
        sendError(res, error);
    }
});

app.get("/post/:id", async function (req, res) {
    let id = String(req.params.id);
    let post;

    if (!isNaN(id)) {
        post = await Post.findOne({ postId: Number(id) });
    } else {
        sendNotFound(res);
        return;
    }

    if (post) {
        res.status(200).json({ status: "ok", post: post });
    } else {
        sendNotFound(res);
    }
});

app.post("/create", async function (req, res) {
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
        sendError(res, error);
    }
});

app.post("/update", async function (req, res) {
    let postId = String(req.query.id);
    let data = req.body;
    let post;

    if (!isNaN(postId)) {
        post = await Post.findOne({ postId: Number(postId) });
    } else {
        sendNotFound(res);
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
        sendError(res, error);
    }
});

app.get("/delete", async function (req, res) {
    let postId = String(req.query.id);
    let post;

    try {
        post = await Post.findOne({ postId: Number(postId) });
    } catch (error) {
        sendNotFound(res);
    }

    try {
        post = await Post.deleteOne({ postId: Number(postId) });
        res.status(200).json({ status: "ok", post: post });
    } catch (error) {
        sendError(res, error);
    }
});

//
// Generate new posts with faker
async function getImage(thems) {
    try {
        let response = await axios.get(
            "https://loremflickr.com/json/g/640/480/" + thems.join() + "/all"
        );
        // console.log(response.data.file);
        return response.data.file;
    } catch (error) {
        console.log(error);
    }
}
function getRandomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/posts/generate", async function (req, res) {
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
            thems.push(categories[getRandomInt(0, categories.length)]);
        }
        const photo = await getImage(thems);
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
});
