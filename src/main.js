import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import './assets/tailwind.css';
import toastPlugin from './plugins/toast';

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(toastPlugin)
    .mount('#app')
