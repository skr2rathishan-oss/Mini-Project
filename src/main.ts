import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Tailwind / global CSS (keep only ONE main css entry)
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())  // ✅ Pinia global store
app.use(router)         // ✅ Vue Router pages

app.mount('#app')
