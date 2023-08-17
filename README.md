# New Blog

Данный сервис предназначен для ведения личного блога по любой теме.

На данный момент полностью реализован основной функционал CRUD. В ближайшем будущем планируется добавить авторизацию посредством выдачи JWT.

![preview image](preview/preview.png)


## Руководство по запуску в Docker

### 1. Клонирование репозитория (по ssh)

```sh
git clone git@github.com:Ivan-Knyazev/new-blog.git
```

### 2. Запуск приложения

```sh
docker compose up --build -d
```

## Использование

Для работы с приложением в браузере перейдите по адресу http://localhost

<br/>


## Руководство по запуску для локального использования

### 1. Клонирование репозитория (по ssh)

```sh
git clone git@github.com:Ivan-Knyazev/new-blog.git
```

### 2. Запуск Backend части

```sh
cd backend
```

```sh
npm install
```

```sh
npm run backend
```

### 3. Загрузка данных в БД MongoDB

При старте сервера создстся БД `new-blog`, а в ней коллекция `posts`. Затем можно загрузить в неё данные из json-файла `backend/json/posts.json`

### 4. Запуск Frontend части

```sh
cd ../frontend
```

```sh
npm install
```

```sh
npm run frontend
```

## Использование

Для работы с приложением в браузере перейдите по адресу http://localhost:5173

<br/>

Данный проект выполнялся в качестве выпускной работы на курсе по FullStack разработке (2022-2023) в [МШП - Московской Школе Программистов](https://informatics.ru/) в рамках госпроекта «Код будущего»


<!-- ### Compile and Minify for Production

```sh
npm run build
``` -->
<!-- This project should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/). -->
