<script setup>
import { ref, onMounted } from 'vue'
//import axios from 'axios'
import axiosInstance from '@/api/axiosInstance'

const usageStats = ref([])
const totalCalls = ref(0)
const totalCost = ref(0)
const startDate = ref('2025-06-01')
const endDate = ref('2025-06-21')

const fetchUsageStats = async () => {
  try {
    const res = await axiosInstance.get('/admin/openai/usage', {
      params: {
        start: startDate.value,
        end: endDate.value
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    usageStats.value = res.data
    totalCalls.value = res.data.reduce((acc, item) => acc + item.callCount, 0)
    totalCost.value = res.data.reduce((acc, item) => acc + item.totalCost, 0)

  } catch (err) {
    console.error('통계 불러오기 실패', err)
  }
}

onMounted(() => {
  fetchUsageStats()
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">🧠 GPT 요금 통계</h1>

    <div class="mb-4">
      <label class="mr-2">시작일:</label>
      <input type="date" v-model="startDate" class="border rounded px-2 py-1" />
      <label class="ml-4 mr-2">종료일:</label>
      <input type="date" v-model="endDate" class="border rounded px-2 py-1" />
      <button @click="fetchUsageStats" class="ml-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
        조회
      </button>
    </div>

    <div class="bg-gray-100 p-4 rounded shadow mb-6">
      <p><strong>총 호출 수:</strong> {{ totalCalls }}</p>
      <p><strong>총 요금 ($):</strong> {{ totalCost.toFixed(4) }}</p>
    </div>

    <table class="w-full text-left border">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2 border">날짜</th>
          <th class="px-4 py-2 border">호출 수</th>
          <th class="px-4 py-2 border">예상 요금 ($)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stat, index) in usageStats" :key="index" class="border-t">
          <td class="px-4 py-2 border">{{ stat.date }}</td>
          <td class="px-4 py-2 border">{{ stat.callCount }}</td>
          <td class="px-4 py-2 border">{{ stat.totalCost.toFixed(4) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
