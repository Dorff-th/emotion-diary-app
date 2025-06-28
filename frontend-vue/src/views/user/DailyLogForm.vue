<script setup>
import { ref, onMounted } from 'vue'
import DailyLogFormFields from '@/components/DailyLogFormFields.vue'
import DailyLogList from '@/components/DailyLogList.vue'
import GPTSummaryBox from '@/components/GPTSummaryBox.vue'
import { createDailyLog, getLogsByDate, getTodayLogs } from '@/api/dailyLog'
import { useToast } from 'vue-toastification'   // 토스트 임포트 (2025.06.27 add.)

// ✅ 상태 변수 선언
const mood = ref('')
const selectedHabits = ref([])
const reflection = ref('')
const selectedDate = ref(new Date().toISOString().slice(0, 10))
const todayLogs = ref([])

// ✅ 마운트 시 오늘 기록 불러오기
onMounted(async () => {
  try {
    const res = await getTodayLogs()
    if (res.status === 200) {
      todayLogs.value = res.data
    }
  } catch (err) {
    console.error('오늘 기록 조회 실패', err)
  }
})

const toast = useToast()    // 토스트 use (2025.06.27 add.)
const handleSave = async () => {
  try {
    const payload = {
      mood: mood.value,
      habits: selectedHabits.value,
      reflection: reflection.value,
    }
    const res = await createDailyLog(payload)
    if (res.status === 201 || res.status === 200) {
      toast.success('기록이 저장되었습니다.')
      // 저장 후 다시 목록 새로고침
      const updated = await getTodayLogs()
      todayLogs.value = updated.data
    }
  } catch (err) {
    console.error('기록 저장 실패', err)
    //alert('기록 저장에 실패했습니다.')
    toast.error('기록 저장에 실패했습니다.')
  }
}


</script>

<template>
  <div class="p-4">
    <DailyLogFormFields
      v-model:mood="mood"
      v-model:selectedHabits="selectedHabits"
      v-model:reflection="reflection"
    />
    <GPTSummaryBox :date="selectedDate" />
    <DailyLogList :logs="todayLogs" />

    <!-- ✅ 기록 저장 버튼 -->
    <button
      @click="handleSave"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      기록 저장
    </button>

  </div>
</template>
