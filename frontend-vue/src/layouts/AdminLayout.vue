<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center flex-wrap gap-2">
      <!-- 좌측: 페이지 제목 -->
      <h1 class="text-lg font-semibold mr-4">관리자 전용 페이지</h1>

      <!-- 가운데: 메뉴 버튼들 -->
      <nav class="flex gap-2 flex-wrap">
        <router-link
          to="/admin/dashboard"
          class="px-4 py-2 rounded-md text-sm font-medium"
          :class="route.path === '/admin/dashboard' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'"
        >
          대시보드
        </router-link>
        <router-link
          to="/admin/gpt-stats"
          class="px-4 py-2 rounded-md text-sm font-medium"
          :class="route.path === '/admin/gpt-stats' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'"
        >
          GPT 요금 통계
        </router-link>
      </nav>

      <!-- 우측: 로그아웃 버튼 -->
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
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
      © 2025 Zmylong App
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
