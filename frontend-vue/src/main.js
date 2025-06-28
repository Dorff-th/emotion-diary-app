// main.js
import './assets/main.css';
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router' // 라우터 있을 경우
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())  // 💡 여기서 등록
app.use(router)         // (선택)
app.use(Toast, {
  // 옵션: 위치, 지속시간 등
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
})
app.mount('#app')
