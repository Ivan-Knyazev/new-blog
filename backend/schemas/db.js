const mongoose = require("mongoose");
const config = require("../utils/loadEnv");

dbPatch =
    "mongodb://" +
    config.mongoHost +
    ":" +
    config.mongoPort +
    "/" +
    config.mongoDb;

// Настройка БД
// mongodb://user:password@host:port/db?authSource=admin
mongoose
    .connect(dbPatch, {
        maxPoolSize: 10,
        authSource: "admin",
        user: config.mongoUser,
        pass: config.mongoPwd,
    })
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));

module.exports = mongoose;
