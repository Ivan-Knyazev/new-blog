<script>
import axios from "axios";

export default {
    data() {
        return {
            title: "",
            text: "",
            photo: "",
            author: "",
        };
    },
    methods: {
        goHome() {
            this.$router.push({
                name: "home",
            });
        },
        async send(evt) {
            evt.preventDefault();
            // console.log(this.title, this.text, this.photo, this.author);
            await axios.post(
                "/create",
                {
                    title: this.title,
                    text: this.text,
                    photo: this.photo,
                    author: this.author,
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

            alert("Пост успешно создан!");
            this.$router.push({
                name: "home",
            });
        },
    },
};
</script>

<template>
    <!-- Страница 2
    <br /> -->

    <h2 class="title card-title mt-2 mb-3">Новый пост</h2>

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
                        v-model="title"
                    />
                </div>
                <div class="form-floating mb-3">
                    <textarea
                        class="form-control"
                        placeholder="Введите текст статьи"
                        id="floatingTextarea2"
                        style="height: 100px"
                        required
                        v-model="text"
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
                        v-model="photo"
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
                        v-model="author"
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
