<template>
  <router-view />
  <LoadingModal :visible="loadingStore.isLoading" />
</template>

<script setup>
import { useLoadingStore } from '@/stores/loadingStore'
import LoadingModal from '@/components/common/LoadingModal.vue'

const loadingStore = useLoadingStore()
</script>
