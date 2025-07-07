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

const toastOptions = {
  // 여기서 스타일 관련 옵션 설정 가능
  position: 'top-right',
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  toastClassName: 'my-toast-class',  // 커스텀 클래스 사용 시
}

const pinia = createPinia()

app.use(pinia)               // ✅ Pinia 먼저
app.use(router)              // (라우터도 있다면)
app.use(Toast, toastOptions)               // ✅ Toastification
app.mount('#app')            // ✅ mount 후
initToast()                  // ✅ 마지막에 toast 인스턴스 초기화
