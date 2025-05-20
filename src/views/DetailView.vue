<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DefaultService } from '../api/services/DefaultService'
import type { DualCube } from '../api/models/DualCube'

const route = useRoute()
const router = useRouter()
const dualCube = ref<DualCube | null>(null)
const loading = ref(false)
const error = ref('')

const fetchDualCube = async (id: string) => {
  loading.value = true
  error.value = ''
  try {
    dualCube.value = await DefaultService.getDualCubeById(id)
  } catch (err) {
    error.value = '获取数据失败，请稍后再试'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  const id = route.query.id as string
  if (id) {
    fetchDualCube(id)
  } else {
    error.value = '缺少ID参数'
  }
})
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>DualCube 详情</h1>
      <button class="btn btn-secondary" @click="goBack">
        <i class="bi bi-arrow-left me-1"></i> 返回列表
      </button>
    </div>
    
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">加载中...</span>
      </div>
      <p class="mt-2">加载中...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-danger" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ error }}
    </div>
    
    <div v-else-if="!dualCube" class="alert alert-warning" role="alert">
      <i class="bi bi-exclamation-circle-fill me-2"></i>
      未找到数据
    </div>
    
    <div v-else>
      <div class="card shadow-sm mb-4">
        <div class="card-header bg-primary text-white">
          <h5 class="card-title mb-0">基本信息</h5>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-3 fw-bold">ID:</div>
            <div class="col-md-9">{{ dualCube.id }}</div>
          </div>
          
          <div class="row mb-3">
            <div class="col-md-3 fw-bold">标识符:</div>
            <div class="col-md-9">{{ dualCube.ident }}</div>
          </div>
          
          <div class="row mb-3">
            <div class="col-md-3 fw-bold">主机名:</div>
            <div class="col-md-9">{{ dualCube.hostname }}</div>
          </div>
          
          <div class="row mb-3">
            <div class="col-md-3 fw-bold">操作系统:</div>
            <div class="col-md-9">{{ dualCube.os }}</div>
          </div>
          
          <div class="row">
            <div class="col-md-3 fw-bold">CPU:</div>
            <div class="col-md-9">{{ dualCube.cpu }}</div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-success text-white">
              <h5 class="card-title mb-0">单线程测试</h5>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-5 fw-bold">秒数:</div>
                <div class="col-7">{{ dualCube.singleSec }}</div>
              </div>
              
              <div class="row">
                <div class="col-5 fw-bold">纳秒数:</div>
                <div class="col-7">{{ dualCube.singleNanosec }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-info text-white">
              <h5 class="card-title mb-0">多线程测试</h5>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-5 fw-bold">秒数:</div>
                <div class="col-7">{{ dualCube.multiSec }}</div>
              </div>
              
              <div class="row">
                <div class="col-5 fw-bold">纳秒数:</div>
                <div class="col-7">{{ dualCube.multiNanosec }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card shadow-sm">
        <div class="card-header bg-secondary text-white">
          <h5 class="card-title mb-0">其他信息</h5>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-3 fw-bold">客户端版本:</div>
            <div class="col-md-9">{{ dualCube.version }}</div>
          </div>
          
          <div class="row">
            <div class="col-md-3 fw-bold">创建时间:</div>
            <div class="col-md-9">{{ dualCube.createdAt }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error, .empty {
  margin-top: 20px;
  padding: 20px;
  text-align: center;
}

.error {
  color: red;
}

.detail-card {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.label {
  width: 200px;
  font-weight: bold;
}

.value {
  flex: 1;
}

.back-button {
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.back-button:hover {
  background-color: #0b7dda;
}
</style> 