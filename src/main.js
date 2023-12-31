import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'

// import axios from 'axios'
// axios.defaults.baseURL = '/api'

const app = createApp(App)
app.use(pinia).use(router).mount('#app')
