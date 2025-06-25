<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-lg font-semibold">관리자 전용 페이지</h1>
      <div>
        <router-link
          to="/admin/dashboard"
          class="mr-4 hover:underline"
        >
          대시보드
        </router-link>
        <router-link
          to="/admin/gpt-stats"
          class="mr-4 hover:underline"
        >
          GPT 요금 통계
        </router-link>
        <button
          @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg"
        >
          로그아웃
        </button>
      </div>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('accessToken')
  router.push('/login')
}
</script>
