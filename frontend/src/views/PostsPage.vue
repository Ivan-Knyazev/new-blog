<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
    data() {
        return {
            defaultURL: "/src/assets/not-image.png",
            posts: [],
        };
    },
    mounted() {
        // setInterval(() => {
        //     this.loadAll();
        // }, 5000);
        this.loadAll();
    },
    methods: {
        async loadAll() {
            let response = await axios.get("/posts", {
                validateStatus: function (status) {
                    if (status > 400) {
                        console.log("ERROR: Status code " + status);
                    }
                    return status < 400; // Разрешить, если код состояния меньше 400
                },
            });
            this.posts = response.data.posts;
            // console.log(this.$route.fullPath);
            // console.log(response.data);
        },
        getDate(isoDate) {
            let date = dayjs(isoDate);
            let format = date.format("HH:mm DD.MM.YYYY");
            return format;
        },
        goPost(id) {
            this.$router.push({
                name: "view",
                params: {
                    id: id,
                },
            });
        },
        goEdit(id) {
            this.$router.push({
                path: "edit",
                query: {
                    id: id,
                },
            });
        },
        async deletePost(id) {
            let response = await axios.get("/delete?id=" + id, {
                validateStatus: function (status) {
                    if (status > 400) {
                        console.log("ERROR: Status code " + status);
                    }
                    return status < 400; // Разрешить, если код состояния меньше 400
                },
            });

            alert("Пост успешно удалён!");
            this.loadAll();
            this.$router.push({
                name: "home",
            });
        },
        async generate(count) {
            let response = await axios.get("/posts/generate?count=" + count, {
                validateStatus: function (status) {
                    if (status > 400) {
                        console.log("ERROR: Status code " + status);
                    }
                    return status < 400; // Разрешить, если код состояния меньше 400
                },
            });

            alert("Пост успешно сгенерирован!");
            this.loadAll();
            this.$router.push({
                name: "home",
            });
        },
    },
};
</script>

<template>
    <!-- <div class="d-flex justify-content-around">...</div> -->
    <div
        class="d-flex flex-nowrap justify-content-around align-items-center mb-2"
    >
        <div style="width: 250px;"></div>
        <h1 class="title card-title mt-2 mb-3">Все посты</h1>
        <button
            v-if="this.$route.fullPath == '/'"
            @click="generate(1)"
            class="btn btn-outline-primary me-3"
        >
            Сгенерировать новый пост
        </button>
    </div>

    <div class="d-flex flex-wrap justify-content-center align-items-center">
        <div
            class="card mx-3 mb-4"
            style="max-width: 550px"
            v-for="(item, index) in posts"
        >
            <img
                @click="goPost(item.postId)"
                v-if="item.photo.length != 0"
                :src="item.photo"
                class="card-img-top card-img-size pointer"
                alt="Image"
            />
            <img
                @click="goPost(item.postId)"
                v-else
                :src="defaultURL"
                class="card-img-top card-img-size pointer"
                alt="Image"
            />
            <div class="card-body">
                <div
                    class="d-flex flex-nowrap justify-content-between align-items-center mb-2"
                >
                    <h5 class="card-title h4">{{ item.title }}</h5>
                    <div
                        class="d-flex flex-nowrap justify-content-between align-items-center mb-2"
                    >
                        <button
                            @click="goEdit(item.postId)"
                            class="btn btn-outline-secondary me-3"
                        >
                            <img src="/src/assets/edit.png" width="20" />
                            <!-- edit -->
                        </button>
                        <button
                            @click="deletePost(item.postId)"
                            class="btn btn-outline-secondary"
                        >
                            <img src="/src/assets/delete.png" width="20" />
                            <!-- delete -->
                        </button>
                    </div>
                </div>

                <p class="card-text">{{ item.text.slice(0, 200) }}...</p>
                <div
                    class="d-flex flex-nowrap justify-content-between align-items-center"
                >
                    <div>
                        <p class="card-text">
                            <small class="text-muted text-medium"
                                ><b>{{ item.author }}</b
                                >, обновлено в
                                {{ getDate(item.updatedAt) }}</small
                            >
                        </p>
                    </div>
                    <div>
                        <button
                            @click="goPost(item.postId)"
                            class="btn btn-outline-success me-1"
                        >
                            Читать далее
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="card mx-3 mb-4" style="max-width: 550px">
                <a href="#">
                    <img
                        src="src/assets/posts/programmer.jpg"
                        class="card-img-top card-img"
                        alt="Card title"
                    />
                </a>
                <div class="card-body">
                    <h5 class="card-title h4">Card title</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer...
                    </p>
                    <div
                        class="d-flex flex-nowrap justify-content-between align-items-center"
                    >
                        <div>
                            <p class="card-text">
                                <small class="text-muted"
                                    >Last updated 3 mins ago</small
                                >
                            </p>
                        </div>
                        <div>
                            <button class="btn btn-outline-success me-1">
                                Читать далее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mx-3 mb-4" style="max-width: 550px">
                <a href="#">
                    <img
                        src="src/assets/not-image.png"
                        class="card-img-top card-img"
                        alt="Card title"
                    />
                </a>
                <div class="card-body">
                    <h5 class="card-title h4">Card title</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer...
                    </p>
                    <div
                        class="d-flex flex-nowrap justify-content-between align-items-center"
                    >
                        <div>
                            <p class="card-text">
                                <small class="text-muted"
                                    >Last updated 3 mins ago</small
                                >
                            </p>
                        </div>
                        <div>
                            <button class="btn btn-outline-success me-1">
                                Читать далее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mx-3 mb-4" style="max-width: 550px">
                <a href="#">
                    <img
                        src="src/assets/not-image.png"
                        class="card-img-top card-img"
                        alt="Card title"
                    />
                </a>
                <div class="card-body">
                    <h5 class="card-title h4">Card title</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer...
                    </p>
                    <div
                        class="d-flex flex-nowrap justify-content-between align-items-center"
                    >
                        <div>
                            <p class="card-text">
                                <small class="text-muted"
                                    >Last updated 3 mins ago</small
                                >
                            </p>
                        </div>
                        <div>
                            <button class="btn btn-outline-success me-1">
                                Читать далее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mx-3 mb-4" style="max-width: 550px">
                <a href="#">
                    <img
                        src="src/assets/posts/cat.jpg"
                        class="card-img-top card-img"
                        alt="Card title"
                    />
                </a>
                <div class="card-body">
                    <h5 class="card-title h4">Card title</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer...
                    </p>
                    <div
                        class="d-flex flex-nowrap justify-content-between align-items-center"
                    >
                        <div>
                            <p class="card-text">
                                <small class="text-muted"
                                    >Last updated 3 mins ago</small
                                >
                            </p>
                        </div>
                        <div>
                            <button class="btn btn-outline-success me-1">
                                Читать далее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mx-3 mb-4" style="max-width: 550px">
                <a href="#">
                    <img
                        src="src/assets/posts/programmer.jpg"
                        class="card-img-top card-img"
                        alt="Card title"
                    />
                </a>
                <div class="card-body">
                    <h5 class="card-title h4">Card title</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer...
                    </p>
                    <div
                        class="d-flex flex-nowrap justify-content-between align-items-center"
                    >
                        <div>
                            <p class="card-text">
                                <small class="text-muted"
                                    >Last updated 3 mins ago</small
                                >
                            </p>
                        </div>
                        <div>
                            <button class="btn btn-outline-success me-1">
                                Читать далее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mx-3 mb-4" style="max-width: 550px">
                <a href="#">
                    <img
                        src="src/assets/posts/programmer.jpg"
                        class="card-img-top card-img"
                        alt="Card title"
                    />
                </a>
                <div class="card-body">
                    <h5 class="card-title h4">Card title</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer...
                    </p>
                    <div
                        class="d-flex flex-nowrap justify-content-between align-items-center"
                    >
                        <div>
                            <p class="card-text">
                                <small class="text-muted"
                                    >Last updated 3 mins ago</small
                                >
                            </p>
                        </div>
                        <div>
                            <button class="btn btn-outline-success me-1">
                                Читать далее
                            </button>
                        </div>
                    </div>
                </div>
            </div> -->
    </div>
</template>

<style>
.card-img-size {
    object-fit: cover;
    height: 300px;
}
.title {
    text-align: center;
}
.pointer {
    cursor: pointer;
}
/* .pointer:hover {
    background-color: #ccc;
} */
.text-medium {
    font-size: 14px;
}
</style>
