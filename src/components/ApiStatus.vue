<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DefaultService } from '../api/services/DefaultService'

const status = ref('')
const loading = ref(false)
const error = ref('')

const checkApiStatus = async () => {
  loading.value = true
  error.value = ''
  try {
    status.value = await DefaultService.getGameStatus()
  } catch (err) {
    error.value = '无法连接到API服务器'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  checkApiStatus()
})
</script>

<template>
  <div class="api-status card p-3 mb-4">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="mb-0">API服务器状态</h5>
      <button class="btn btn-sm btn-outline-primary" @click="checkApiStatus">
        <i class="bi bi-arrow-repeat me-1"></i> 刷新
      </button>
    </div>
    
    <div v-if="loading" class="d-flex align-items-center mt-2">
      <div class="spinner-border spinner-border-sm text-primary me-2" role="status">
        <span class="visually-hidden">加载中...</span>
      </div>
      <span>检查中...</span>
    </div>
    
    <div v-else-if="error" class="text-danger mt-2">
      <i class="bi bi-exclamation-triangle-fill me-1"></i> {{ error }}
    </div>
    
    <div v-else-if="status" class="text-success mt-2">
      <i class="bi bi-check-circle-fill me-1"></i> {{ status }}
    </div>
    
    <div v-else class="text-muted mt-2">
      尚未获取状态信息
    </div>
  </div>
</template> 