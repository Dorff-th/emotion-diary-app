<template>
  <div v-if="visible" class="loading-overlay">
    <div class="loading-box">Loading...</div>
  </div>
</template>

<script setup>
defineProps({ visible: Boolean })
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(100, 100, 100, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loading-box {
  background: white;
  border-radius: 50%;
  padding: 2rem;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}
</style>
