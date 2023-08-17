const express = require(`express`);
const cors = require("cors");
const app = express();

const config = require("./utils/loadEnv") || 3000;
const postRouter = require("./routers/post");


// app.use(express.static('public')); // Раздача статических файлов
// app.use(express.urlencoded({ extended: true }));

frontPatch = "http://" + config.frontHost + ":" + config.frontPort;
app.use(express.json()); // Настройка POST-запроса — JSON
app.use(cors({ origin: frontPatch })); // Настройка CORS
app.disable("x-powered-by"); // Отключение "ненужных" заголовков [server, via]

// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
  
//     next();
// });

app.use("/", postRouter);

app.listen(config.backPort, function () {
    console.log(`Service started in: ` + `http://localhost:${config.backPort}`);
});
