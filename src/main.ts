/** @format */

import { createApp } from 'vue';
import { createPinia } from 'pinia';

/** Шрифт */
import './assets/font/montserrat/index.scss';
/** Стили */
import './assets/style/index.scss';
/** Расширения классов */
import './extensions';

import App from './app.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
