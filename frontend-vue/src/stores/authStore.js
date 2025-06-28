import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('accessToken', newToken)
  }

  const clearToken = () => {
    token.value = ''
    localStorage.removeItem('accessToken')
  }

  return { token, setToken, clearToken }
})
