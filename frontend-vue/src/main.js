// main.js
import './assets/main.css';
import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { initToast } from '@/utils/toastHelper'
import router from '@/router'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)               // ✅ Pinia 먼저
app.use(router)              // (라우터도 있다면)
app.use(Toast)               // ✅ Toastification
app.mount('#app')            // ✅ mount 후
initToast()                  // ✅ 마지막에 toast 인스턴스 초기화
