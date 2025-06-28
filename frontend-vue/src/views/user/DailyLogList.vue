<script setup>
import { ref, watch, onMounted } from 'vue'

import { getLogsByDate } from '@/api/dailylog'
import DailyLogList from '@/components/DailyLogList.vue'
//import LoadingModal from '@/components/common/LoadingModal.vue'  //모달창을 수동으로 (2025.06.27)

// 날짜 선택
const selectedDate = ref(new Date().toISOString().slice(0, 10)) // 오늘 날짜 기본값
const todayLogs = ref([])

// 날짜별 감정/회고 데이터 불러오기
//const isLoading = ref(false)
const fetchLogs = async (date) => {

   //isLoading.value = true

  try {
    //await new Promise(resolve => setTimeout(resolve, 2000)) // 예시용 딜레이
    const res = await getLogsByDate(date)
    todayLogs.value = res.data
  } catch (err) {
    console.error('로그 불러오기 실패:', err)
    todayLogs.value = []
  } 
}

// 날짜가 바뀔 때마다 fetch
watch(selectedDate, (newDate) => {
  fetchLogs(newDate)
})

// 진입 시 오늘 날짜 로그 불러오기
onMounted(() => {
  fetchLogs(selectedDate.value)
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-2">감정 & 회고 기록 보기</h2>

    <!-- 날짜 선택 -->
    <input
      type="date"
      v-model="selectedDate"
      class="border rounded px-2 py-1 mb-4"
    />

    <!-- 로그 목록 출력 -->
    <DailyLogList :logs="todayLogs" />
  </div>
</template>
