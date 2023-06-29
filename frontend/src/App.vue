<script>
// Компоненты
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

import { RouterView } from "vue-router";

// Главная страница
export default {
    components: {
        RouterView,
        AppFooter,
        AppHeader,
    },
};
</script>

<template>
    <div class="app">
        <!-- Шапка -->
        <app-header></app-header>

        <!-- Меняющаяся часть -->
        <div id="content">
            <router-view></router-view>
        </div>

        <!-- Подвал -->
        <app-footer></app-footer>
    </div>
</template>

<style>
#content {
    margin-top: 60px;
}
</style>
