import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


import './main.css'
import App from './app.vue'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router).use(pinia)
app.mount('#app')
