<template>
  <div class="space-y-6">
    <!-- 감정 선택 -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">오늘 기분은 어땠나요?</label>
      <select
        :value="mood"
        @change="$emit('update:mood', $event.target.value)"
        class="w-full p-2 border rounded-lg"
      >
        <option disabled value="">감정 선택</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }}점</option>
      </select>
    </div>

    <!-- 습관 체크 -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">오늘 어떤 습관을 실천했나요?</label>
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
  mood: String,
  selectedHabits: Array,
  reflection: String
})

const emits = defineEmits(['update:mood', 'update:selectedHabits', 'update:reflection'])

const habitOptions = ['명상', '운동', '일기쓰기', '산책', '게임', '독서', '멍때리기']

const handleHabitChange = (habit, checked) => {
  const updated = checked
    ? [...props.selectedHabits, habit]
    : props.selectedHabits.filter((h) => h !== habit)

  emits('update:selectedHabits', updated)
}
</script>
