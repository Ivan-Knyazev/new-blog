import { createRouter, createWebHistory } from "vue-router";

// Компоненты страниц
import PostsPage from "./views/PostsPage.vue";
import EditPage from "./views/EditPage.vue";
import ViewPage from "./views/ViewPage.vue";
import CreatePage from "./views/CreatePage.vue";
import NotFound from "./views/NotFound.vue";
import ServerError from "./views/ServerError.vue";

export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),

    // Роуты и компоненты
    routes: [
        {
            path: "/",
            name: "home",
            component: PostsPage,
        },
        {
            path: "/post/:id",
            name: "view",
            component: ViewPage,
        },
        {
            path: "/create",
            name: "create",
            component: CreatePage,
        },
        {
            path: "/edit",
            name: "edit",
            component: EditPage,
        },

        {
            path: "/404",
            name: "404",
            component: NotFound,
        },
        {
            path: "/500",
            name: "500",
            component: ServerError,
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: '/404'
        },
    ],
});
