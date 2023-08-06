// Запросы к серверу
import axios from "axios";
import url from "./loadEnv";
axios.defaults.baseURL = url;

// Работа с датой
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.locale("ru");
dayjs.extend(relativeTime);


// Всё для vue
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";

// Рендер в HTML
createApp(App).use(router).mount("#app");
