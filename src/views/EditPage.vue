<script>
import axios from "axios";

export default {
    data() {
        return {
            postId: "",
            post: {
                title: "",
                text: "",
                photo: "",
                author: "",
            },
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        goHome() {
            this.$router.push({
                name: "home",
            });
        },
        async loadData() {
            this.postId = this.$route.query.id;
            let response = await axios.get("/post/" + this.postId, {
                validateStatus: function (status) {
                    if (status > 400) {
                        console.log("ERROR: Status code " + status);
                    }
                    return status < 400; // Разрешить, если код состояния меньше 400
                },
            });
            this.post = response.data.post;
        },
        async send(evt) {
            evt.preventDefault();
            await axios.post(
                "/update?id=" + this.postId,
                {
                    title: this.post.title,
                    text: this.post.text,
                    photo: this.post.photo,
                    author: this.post.author,
                },
                {
                    validateStatus: function (status) {
                        if (status > 400) {
                            console.log("ERROR: Status code " + status);
                        }
                        return status < 400; // Разрешить, если код состояния меньше 400
                    },
                }
            );

            alert("Пост успешно обновлён!");
            this.$router.push({
                name: "home",
            });
        },
    },
};
</script>

<template>
    <!-- <h3>Страница EditPage, id={{ this.$route.query.id }}</h3> -->

    <h2 class="title card-title mt-2 mb-3">Редактирование поста</h2>

    <div class="d-flex flex-wrap justify-content-center align-items-center">
        <div class="mb-4" style="max-width: 80%; min-width: 80%">
            <form @submit="send">
                <div class="input-group input-group-lg mb-4">
                    <span class="input-group-text" id="inputGroup-sizing-lg"
                        >Заголовок<span class="required">*</span></span
                    >
                    <input
                        type="text"
                        class="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Введите заголовок статьи"
                        required
                        v-model="post.title"
                    />
                </div>
                <div class="form-floating mb-3">
                    <textarea
                        class="form-control"
                        placeholder="Введите текст статьи"
                        id="floatingTextarea2"
                        style="height: 100px"
                        required
                        v-model="post.text"
                    ></textarea>
                    <label for="floatingTextarea2"
                        >Текст статьи<span class="required">*</span></label
                    >
                </div>
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput1"
                        placeholder="example.com/photo"
                        v-model="post.photo"
                    />
                    <label for="floatingInput1">Ссылка на картинку</label>
                </div>
                <!-- <div class="mb-3">
                    <input
                        type="file"
                        class="form-control"
                        aria-label="file example"
                    />
                    <div class="invalid-feedback">
                        Пример обратной связи неверной формы выбора файла
                    </div>
                </div> -->

                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput2"
                        placeholder="Ivan Knyazev"
                        required
                        v-model="post.author"
                    />
                    <label for="floatingInput2"
                        >Автор<span class="required">*</span></label
                    >
                </div>
                <p class="mx-3 mb-4">
                    Поля, отмеченные знаком
                    <span class="required">*</span> обязательны к заполнению
                </p>

                <div class="d-grid gap-2 col-3 mx-auto mb-5">
                    <button type="submit" class="btn btn-success">
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
.required {
    color: rgb(206, 30, 30);
}
</style>
