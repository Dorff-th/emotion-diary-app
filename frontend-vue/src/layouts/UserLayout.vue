<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-lg font-semibold">사용자 홈</h1>
       <div>
        <router-link
          to="/user/daily-log"
          class="mr-4 hover:underline"
        >
          감정&회고
        </router-link>
        <router-link
          to="/user/daily-logs"
          class="mr-4 hover:underline"
        >
          감정&회고 보기
        </router-link>

        <router-link
          to="/user/mypage"
          class="mr-4 hover:underline"
        >
          내 정보
        </router-link>

      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg">
        로그아웃
      </button>
  </div>
    </header>

    <main class="flex-1 p-4 bg-gray-50">
      <router-view />
    </main>

    <footer class="bg-gray-100 text-center p-2 text-sm text-gray-500">
      ⓒ 2025 ZmyLong App
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('accessToken')
  //router.push('/login')
  router.push({ name: 'Login', query: { loggedOut: 'true' } })
  
}
</script>
