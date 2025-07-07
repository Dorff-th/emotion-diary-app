<template>
  <div class="space-y-6">
    <!-- 감정 선택 -->
      <div :class="{ 'animate': animateSelect }" class="select-wrapper">
      <label class="block text-gray-700 font-medium mb-2">오늘 기분은 어땠나요?</label>
      <select
        @change="handleChange"
        class="w-full p-2 border rounded-lg"
      >
        
        <option v-for="(emoji, score) in emojiMap"
        :key="score"
        :value="score">{{ score }} - {{ emoji }}</option>
      </select>
    </div>

    <!-- 습관 체크 -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">오늘 어떤 습관을 실천했나요 아니면 주로 한일은?</label>
      <div class="flex flex-wrap gap-3">
        <label
          v-for="habit in habitOptions"
          :key="habit"
          class="flex items-center gap-2 px-3 py-2 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
        >
          <input
            type="checkbox"
            :value="habit"
            :checked="selectedHabits.includes(habit)"
            @change="handleHabitChange(habit, $event.target.checked)"
            class="accent-blue-500"
          />
          {{ habit }}
        </label>
      </div>
    </div>

    <!-- 회고 일기 -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">오늘의 회고 일기</label>
      <textarea
        :value="reflection"
        @input="$emit('update:reflection', $event.target.value)"
        rows="4"
        class="w-full p-3 border rounded-lg"
        placeholder="오늘 하루를 되돌아보며 느낀 점을 자유롭게 적어보세요."
      ></textarea>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  mood: Number,
  selectedHabits: Array,
  reflection: String
})

const emits = defineEmits(['update:mood', 'update:selectedHabits', 'update:reflection'])

const habitOptions = ['명상', '운동', '일기쓰기', '산책', '게임', '독서', '멍때리기', 'GTP와기싸움', '삽질']

const handleHabitChange = (habit, checked) => {
  const updated = checked
    ? [...props.selectedHabits, habit]
    : props.selectedHabits.filter((h) => h !== habit)

  emits('update:selectedHabits', updated)
}

import { ref, defineEmits, defineProps } from 'vue'


//const emit = defineEmits(['update:modelValue'])


const animateSelect = ref(false)

const emojiMap = {
  1: '😭',
  2: '😢',
  3: '😞',
  4: '😕',
  5: '😐',
  6: '🙂',
  7: '😌',
  8: '😊',
  9: '😁',
  10: '🤩'
}

const handleChange = (e) => {
  const value = parseInt(e.target.value)
  emits('update:mood', value) // 🔁 v-model 업데이트

  // ✅ 애니메이션 트리거
  animateSelect.value = false
  requestAnimationFrame(() => {
    animateSelect.value = true
  })
}

</script>

<style scoped>
.select-wrapper {
  display: inline-block;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.select-wrapper.animate {
  transform: scale(1.03);
  box-shadow: 0 0 8px rgba(100, 200, 255, 0.7);
}
.emotion-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}
</style>