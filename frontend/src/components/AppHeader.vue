<script>
import axios from "axios";

export default {
    data() {
        return {
            post: {},
        };
    },
    methods: {
        renderText(text) {
            result = text.replace(/\n/g, "<br/>");
            console.log(result);
            // return result;
        },
        goHome() {
            this.$router.push({
                name: "home",
            });
        },
        goCreate() {
            this.$router.push({
                name: "create",
            });
        },
        // async generate(count) {
        //     let response = await axios.get("/posts/generate?count=" + count, {
        //         validateStatus: function (status) {
        //             if (status > 400) {
        //                 console.log("ERROR: Status code " + status);
        //             }
        //             return status < 400; // Разрешить, если код состояния меньше 400
        //         },
        //     });

        //     alert("Посты успешно сгенерированы!");
        //     this.loadAll();
        //     this.$router.push({
        //         name: "home",
        //     });
        // },
        // async loadAll() {
        //     let response = await axios.get("/posts", {
        //         validateStatus: function (status) {
        //             if (status > 400) {
        //                 console.log("ERROR: Status code " + status);
        //             }
        //             return status < 400; // Разрешить, если код состояния меньше 400
        //         },
        //     });
        //     this.posts = response.data.posts;
        // },
    },
};
</script>

<template>
    <div id="header">
        <nav
            class="navbar fixed-top navbar-expand-lg navbar-light"
            style="background-color: #e3f2fd"
        >
            <div class="container-fluid">
                <div
                    @click="goHome()"
                    class="d-flex flex-wrap justify-content-center align-items-center pointer"
                >
                    <div class="navbar-brand mb-0 h1">
                        <img src="/src/assets/logo.png" alt="logo" width="30" />
                    </div>
                    <p class="navbar-brand mb-0 h1">New Blog</p>
                </div>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <!-- <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li> -->
                    </ul>
                    <!-- <form v-if="this.$route.fullPath == '/'" class="d-flex">
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Поиск"
                            aria-label="Search"
                        />
                        <a class="link-secondary" href="#" aria-label="Search">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="me-3"
                                role="img"
                                viewBox="0 0 24 24"
                            >
                                <title>Поиск</title>
                                <circle cx="10.5" cy="10.5" r="7.5" />
                                <path d="M21 21l-5.2-5.2" />
                            </svg>
                        </a>
                    </form> -->
                    <!-- <button
                        v-if="this.$route.fullPath == '/'"
                        @click="generate(1)"
                        class="btn btn-outline-primary me-3"
                    >
                        Сгенерировать новый пост
                    </button> -->
                    <button
                        @click="goCreate()"
                        class="btn btn-outline-success me-3"
                    >
                        + Новый пост
                    </button>
                    <a href="#"
                        ><img
                            src="/src/assets/account.png"
                            alt="account"
                            width="25"
                    /></a>
                </div>
            </div>
        </nav>
    </div>
</template>

<style>
#header {
    background-color: white;
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
}
.brand {
    white-space: nowrap;
    display: inline-block;
}
</style>
