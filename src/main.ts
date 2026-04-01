import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useUiStore } from './types/ui';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(router)

useUiStore().initTheme(); // ✅ Single source of truth for dark mode

app.mount('#app')
