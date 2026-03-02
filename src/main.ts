import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useThemeStore } from "./stores/theme";
// Tailwind / global CSS (keep only ONE main css entry)
import './assets/main.css'
import { useUiStore } from './types/ui';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia)  // ✅ Pinia global store
app.use(router)         // ✅ Vue Router pages

useUiStore().initTheme();
const theme = useThemeStore();  // ✅ after pinia is installed
theme.initTheme();

app.mount('#app')
