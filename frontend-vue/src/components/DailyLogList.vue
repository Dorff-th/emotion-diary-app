<template>
  <div v-if="logs.length">
    <div
      v-for="log in logs"
      :key="log.createdAt"
      class="p-4 border rounded-lg mt-4 space-y-1"
    >
      <div class="text-sm text-gray-500">{{ formatDate(log.createdAt) }}</div>
      <div><strong>감정:</strong> {{ log.mood }}점</div>
      <div><strong>습관:</strong> {{ log.habits }}</div>
      <div><strong>회고:</strong> {{ log.reflection }}</div>
      <div class="italic text-blue-700">💬 {{ log.feedback }}</div>
    </div>
  </div>
  <div v-else class="text-center text-gray-500 mt-4">기록이 없습니다.</div>
</template>

<script setup>
const props = defineProps({
  logs: {
    type: Array,
    required: true
  }
})

const formatDate = (datetime) => {
  return new Date(datetime).toLocaleString()
}
</script>
