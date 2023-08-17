const express = require(`express`);
// const cors = require("cors");
const app = express();

const config = require("./utils/loadEnv") || 3000;
const postRouter = require("./routers/post");


// app.use(express.static('public')); // Раздача статических файлов
// app.use(express.urlencoded({ extended: true }));

frontPatch = "http://" + config.frontHost + ":" + config.frontPort;
app.use(express.json()); // Настройка POST-запроса — JSON
// app.use(cors({ origin: frontPatch })); // Настройка CORS
app.disable("x-powered-by"); // Отключение "ненужных" заголовков [server, via]

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Alow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     // res.setHeader('Content-Type', 'application/json');
//     // res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

app.use("/", postRouter);

app.listen(config.backPort, function () {
    console.log(`Service started in: ` + `http://localhost:${config.backPort}`);
});
