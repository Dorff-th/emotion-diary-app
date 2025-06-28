import axios from 'axios'
import { useLoadingStore } from '@/stores/loadingStore'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'
import { useToast } from 'vue-toastification'   // 토스트 임포트 (2025.06.27 add.)

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
})

// ✅ 요청 인터셉터: 로딩 시작 + 토큰 첨부
axiosInstance.interceptors.request.use(
  config => {
    const loadingStore = useLoadingStore()
    const authStore = useAuthStore()

    loadingStore.start()

    const token = authStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    const loadingStore = useLoadingStore()
    loadingStore.end()
    return Promise.reject(error)
  }
)

// ✅ 응답 인터셉터: 로딩 종료 + 에러 핸들링
axiosInstance.interceptors.response.use(
  response => {
    const loadingStore = useLoadingStore()
    loadingStore.end()
    return response
  },
  error => {
    const loadingStore = useLoadingStore()
    loadingStore.end()

    const authStore = useAuthStore()

    const toast = useToast()  // ✅ 토스트 인스턴스

    if (error.response) {
      const { status } = error.response

      if (status === 401 || status === 403) {
        authStore.clearToken()
        router.push({ name: 'Login' })
      } else {
         toast.error(`에러 발생: ${status}`)
      }
    } else {
      toast.error('서버에 연결할 수 없습니다.')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
