<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">로그인</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            v-model="username"
            type="text"
            placeholder="아이디"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="비밀번호"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          로그인
        </button>
        <p v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axiosInstance from '@/api/axiosInstance' // ✅ 고쳐야 할 부분
import { useToast } from 'vue-toastification'   // 토스트 임포트 (2025.06.27 add.)
import { useAuthStore } from '@/stores/authStore' // 2025.06.27 add .

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const route = useRoute();
const toast = useToast()    // 토스트 use (2025.06.27 add.)
onMounted(() => {
  
  if (route.query.loggedOut === 'true') {  
    toast.success('로그아웃 되었습니다.')
  }
})



const handleLogin = async () => {
  try {
    const res = await axiosInstance.post('/auth/login', {
      username: username.value,
      password: password.value
    })

    const { token } = res.data
    //localStorage.setItem('accessToken', token)
    useAuthStore().setToken(token) 
    

    const payload = JSON.parse(atob(token.split('.')[1]))

    const role = payload.role?.replace('ROLE_', '');
    
    if (role === 'ADMIN') {
      router.push('/admin/dashboard')
    } else {
      router.push('/user/daily-log')
    }
  } catch (err) {
    
    //error.value = '로그인 실패: 아이디 또는 비밀번호를 확인해주세요.'
    toast.error('아이디 또는 비밀번호가 잘못되었습니다.')
  }
}
</script>
