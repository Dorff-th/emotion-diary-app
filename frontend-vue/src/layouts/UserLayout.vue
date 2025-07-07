<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-800 text-white flex justify-between items-center flex-wrap p-4 gap-2">
      <!-- 왼쪽 영역: 사용자 홈 + 메뉴 -->
      <div class="flex gap-2 items-center flex-wrap">
        <span class="text-lg font-semibold mr-2">사용자 홈</span>

        <router-link
          to="/user/daily-log"
          class="px-4 py-2 rounded-md text-sm font-medium"
          :class="route.path === '/user/daily-log' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'"
        >
          감정&회고
        </router-link>

        <router-link
          to="/user/daily-logs"
          class="px-4 py-2 rounded-md text-sm font-medium"
          :class="route.path === '/user/daily-logs' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'"
        >
          감정&회고 보기
        </router-link>

        <router-link
          to="/user/mypage"
          class="px-4 py-2 rounded-md text-sm font-medium"
          :class="route.path === '/user/mypage' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'"
        >
          내 정보
        </router-link>
      </div>

      <!-- 오른쪽 영역: 로그아웃 -->
      <button
        @click="logout"
        class="bg-red-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
      >
        로그아웃
      </button>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-4 bg-gray-50">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 text-center p-2 text-sm text-gray-500">
      ⓒ 2025 ZmyLong App
    </footer>
  </div>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const logout = () => {
  localStorage.removeItem('accessToken')
  //router.push('/login')
  router.push({ name: 'Login', query: { loggedOut: 'true' } })
  
}
</script>
