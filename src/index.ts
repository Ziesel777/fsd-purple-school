// import '@/app/styles/index.scss';

import { createApp } from 'vue';
import router from './app/routes';

import App from './app/entrypoint/App.vue';

const app = createApp(App);
app.use(router);
app.mount('#root');
