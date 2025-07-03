<template>
  <div>
    <button
      @click="fetchSummary"
      class="w-full py-2 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg"
    >
      GPT 하루 요약 보기
    </button>

    <div v-if="summary" class="mt-4 p-4 bg-emerald-50 border rounded-lg">
      <h4 class="font-semibold text-emerald-800 mb-2">🧠 하루 요약</h4>
      <p class="text-emerald-700 whitespace-pre-wrap">{{ summary }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getSummaryByDate } from '@/api/dailylog'

const props = defineProps({
  date: {
    type: String,
    required: true
  }
})

const summary = ref('')

const fetchSummary = async () => {
  try {
    const res = await getSummaryByDate(props.date)
    summary.value =
      res.status === 200 ? res.data.summary : '기록이 없어 요약할 수 없습니다.'
  } catch (err) {
    console.error('요약 실패', err)
    summary.value = '요약 요청 중 오류가 발생했습니다.'
  }
}
</script>
