<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
    data() {
        return {
            defaultURL: "/src/assets/not-image.png",
            post: {},
        };
    },

    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
            let postId = this.$route.params.id;
            let response = await axios.get("/post/" + postId, {
                validateStatus: function (status) {
                    if (status > 400) {
                        console.log("ERROR: Status code " + status);
                    }
                    return status < 400; // Разрешить, если код состояния меньше 400
                },
            });
            this.post = response.data.post;
            // console.log(this.post);
        },
        getDate(isoDate) {
            let date = dayjs(isoDate);
            let format = date.format("HH:mm DD.MM.YYYY");
            return format;
        },
        renderText(text) {
            // result = text.replace(/\n/g, "<br/>");
            // console.log(result);
            // return result;
        },
        goEdit(id) {
            this.$router.push({
                path: "/edit",
                query: {
                    id: id,
                },
            });
        },
        async deletePost(id) {
            let response = await axios.get("/delete?id=" + id, {
                validateStatus: function (status) {
                    if (status > 400) {
                        console.log(
                            "ERROR: Status code " +
                                status +
                                "; Response: " +
                                response
                        );
                    }
                    return status < 400; // Разрешить, если код состояния меньше 400
                },
            });

            alert("Пост успешно удалён!");
            // this.loadAll();
            this.$router.push({
                name: "home",
            });
        },
    },

    // watch: {
    //     $route() {
    //         console.log("Change route!!!");
    //         // this.loadData();
    //     },
    // },
};
</script>

<template>
    <!-- <h3>Страница ViewPage, id={{ this.$route.params.id }}</h3> -->

    <div
        class="post d-flex flex-wrap justify-content-center align-items-center"
    >
        <div class="card mb-4" style="max-width: 80%">
            <!-- <img
                :src="post.photo"
                class="card-img-top view-card-img"
                alt="picture"
            /> -->
            <img
                v-if="post.photo"
                :src="post.photo"
                class="card-img-top view-card-img"
                alt="picture"
            />
            <img
                v-else
                :src="defaultURL"
                class="card-img-top view-card-img"
                alt="picture"
            />
            <div class="card-body">
                <!-- <h5 class="card-title h2 title">{{ post.title }}</h5> -->
                <div
                    class="d-flex flex-nowrap justify-content-between align-items-center mb-2"
                >
                    <h5 class="card-title h2">{{ post.title }}</h5>
                    <div
                        class="d-flex flex-nowrap justify-content-between align-items-center mb-2"
                    >
                        <button
                            @click="goEdit(post.postId)"
                            class="btn btn-outline-secondary me-3"
                        >
                            <img src="/src/assets/edit.png" width="20" />
                            <!-- edit -->
                        </button>
                        <button
                            @click="deletePost(post.postId)"
                            class="btn btn-outline-secondary"
                        >
                            <img src="/src/assets/delete.png" width="20" />
                            <!-- delete -->
                        </button>
                    </div>
                </div>
                <p @click="renderText(post.text)" class="card-text">
                    {{ post.text }}
                </p>
                <div
                    class="d-flex flex-nowrap justify-content-between align-items-center"
                >
                    <div>
                        <p class="card-text">
                            <small class="text-muted text-medium"
                                ><b>{{ post.author }}</b
                                >, обновлено в
                                {{ getDate(post.updatedAt) }}</small
                            >
                        </p>
                    </div>
                    <div>
                        <button
                            class="btn btn-outline-secondary me-1"
                            onclick="history.back();"
                        >
                            Назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card-text {
    white-space: pre-wrap;
}
.view-card-img {
    object-fit: cover;
    height: 400px;
}
.post {
    margin-top: 75px;
}
</style>
