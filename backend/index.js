const express = require(`express`);
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios").default;
const faker = require(`faker`);
const app = express();

const postRouter = require("./routers/post");


mongoose.connect("mongodb://127.0.0.1:27017/new-blog"); // Настройка БД

app.use(cors({ origin: "http://localhost:5173" })); // Настройка CORS

app.use(express.json()); // Настройка POST-запроса — JSON

app.use("/", postRouter);


const port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});
