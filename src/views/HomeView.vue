<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { DefaultService } from '../api/services/DefaultService'
import type { DualCube } from '../api/models/DualCube'
import { useRouter } from 'vue-router'
import ApiStatus from '../components/ApiStatus.vue'

const dualCubes = ref<DualCube[]>([])
const loading = ref(false)
const error = ref('')
const router = useRouter()

// 分页相关
const currentPage = ref(0) // 当前页码，从0开始
const pageSize = ref(10) // 每页记录数
const totalItems = ref(0) // 总记录数
const sortByField = ref<'default' | 'singleSec'>('default') // 排序字段

// 计算总页数
const totalPages = computed(() => {
  if (totalItems.value === 0) return 1;
  return Math.ceil(totalItems.value / pageSize.value);
})

// 计算分页显示的页码范围
const pageNumbers = computed(() => {
  const maxPagesToShow = 5; // 最多显示的页码数
  const pages = [];
  let startPage = Math.max(0, currentPage.value - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages.value - 1, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(0, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
})

const fetchDualCubes = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // 根据排序字段选择不同的API调用
    if (sortByField.value === 'singleSec') {
      dualCubes.value = await DefaultService.getDualCubeListSortSingle(
        currentPage.value, 
        pageSize.value
      );
    } else {
      dualCubes.value = await DefaultService.getDualCubeList(
        currentPage.value, 
        pageSize.value
      );
    }
    
    // 由于API没有返回总记录数，这里简单估计
    // 如果当前页返回的记录数小于每页记录数，说明可能已经是最后一页
    if (dualCubes.value.length < pageSize.value) {
      totalItems.value = currentPage.value * pageSize.value + dualCubes.value.length;
    } else {
      // 否则至少还有当前页数量的记录
      totalItems.value = Math.max(
        (currentPage.value + 1) * pageSize.value, 
        totalItems.value
      ); // 保持总条数不减少
    }
    
    // 如果当前页没有数据但总条数不为0，可能是删除了最后一页的所有记录
    // 尝试加载上一页
    if (dualCubes.value.length === 0 && currentPage.value > 0) {
      currentPage.value -= 1;
      fetchDualCubes();
    }
  } catch (err) {
    error.value = '获取数据失败，请稍后再试';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 切换页码
const goToPage = (page: number) => {
  // 确保页码有效
  const validPage = Math.max(0, Math.min(page, Math.max(0, totalPages.value - 1)));
  
  if (validPage !== currentPage.value) {
    console.log(`切换到页码: ${validPage + 1}`); // 调试输出
    currentPage.value = validPage;
    fetchDualCubes();
  }
};

// 上一页
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
    fetchDualCubes();
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value += 1;
    fetchDualCubes();
  }
};

// 切换排序方式
const changeSorting = (field: 'default' | 'singleSec') => {
  sortByField.value = field;
  currentPage.value = 0; // 切换排序时重置到第一页
  fetchDualCubes();
};

const viewDetail = (id: string) => {
  router.push(`/detail?id=${id}`);
};

// 监听页码变化，用于调试
watch(currentPage, (newPage) => {
  console.log(`当前页码: ${newPage + 1}`);
});

onMounted(() => {
  fetchDualCubes();
});
</script>

<template>
  <div>
    <ApiStatus />
    
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>DualCube 列表</h1>
      <div>
        <div class="btn-group me-2">
          <button class="btn" :class="sortByField === 'default' ? 'btn-primary' : 'btn-outline-primary'" 
                  @click="changeSorting('default')">
            默认排序
          </button>
          <button class="btn" :class="sortByField === 'singleSec' ? 'btn-primary' : 'btn-outline-primary'" 
                  @click="changeSorting('singleSec')">
            按单线程性能排序
          </button>
        </div>
        <button class="btn btn-primary" @click="fetchDualCubes">
          <i class="bi bi-arrow-clockwise me-1"></i> 刷新
        </button>
      </div>
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
    
    <div v-else-if="dualCubes.length === 0 && currentPage === 0" class="alert alert-info" role="alert">
      <i class="bi bi-info-circle-fill me-2"></i>
      没有找到数据
    </div>
    
    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>标识符</th>
              <th>主机名</th>
              <th>操作系统</th>
              <th>单线程(秒)</th>
              <th>多线程(秒)</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cube in dualCubes" :key="cube.id">
              <td class="text-truncate" style="max-width: 150px;">{{ cube.id }}</td>
              <td>{{ cube.ident }}</td>
              <td>{{ cube.hostname }}</td>
              <td>{{ cube.os }}</td>
              <td>{{ cube.singleSec }}</td>
              <td>{{ cube.multiSec }}</td>
              <td>
                <button class="btn btn-sm btn-info" @click="viewDetail(cube.id || '')">
                  <i class="bi bi-eye me-1"></i> 详情
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页控件 -->
      <nav aria-label="分页导航" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <button class="page-link" @click="goToPage(0)" :disabled="currentPage === 0">
              <i class="bi bi-chevron-bar-left"></i>
            </button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <button class="page-link" @click="prevPage()" :disabled="currentPage === 0">
              <i class="bi bi-chevron-left"></i>
            </button>
          </li>
          
          <li v-for="page in pageNumbers" :key="page" 
              class="page-item" :class="{ active: page === currentPage }">
            <button class="page-link" @click="goToPage(page)">
              {{ page + 1 }}
            </button>
          </li>
          
          <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
            <button class="page-link" @click="nextPage()" :disabled="currentPage >= totalPages - 1">
              <i class="bi bi-chevron-right"></i>
            </button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
            <button class="page-link" @click="goToPage(totalPages - 1)" :disabled="currentPage >= totalPages - 1">
              <i class="bi bi-chevron-bar-right"></i>
            </button>
          </li>
        </ul>
      </nav>
      
      <!-- 当前页状态 -->
      <div class="text-center mt-2 mb-3">
        <small class="text-success">当前第 {{ currentPage + 1 }} 页 / 共 {{ totalPages }} 页</small>
      </div>
      
      <div class="d-flex justify-content-center mt-2">
        <div class="btn-group">
          <button class="btn btn-outline-secondary" 
                  :class="{ active: pageSize === 5 }" 
                  @click="pageSize = 5; currentPage = 0; fetchDualCubes()">
            5条/页
          </button>
          <button class="btn btn-outline-secondary" 
                  :class="{ active: pageSize === 10 }" 
                  @click="pageSize = 10; currentPage = 0; fetchDualCubes()">
            10条/页
          </button>
          <button class="btn btn-outline-secondary" 
                  :class="{ active: pageSize === 20 }" 
                  @click="pageSize = 20; currentPage = 0; fetchDualCubes()">
            20条/页
          </button>
        </div>
      </div>
      
      <div class="text-center mt-2 text-muted">
        显示第 {{ currentPage * pageSize + 1 }} 到 {{ Math.min((currentPage + 1) * pageSize, totalItems) }} 条，共 {{ totalItems }} 条记录
      </div>

      <div class="card mt-4 bg-light">
        <div class="card-body">
          <h5 class="card-title">性能说明</h5>
          <p class="card-text">单线程和多线程测试结果越低表示性能越好。数值代表完成基准测试所需的秒数。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 分页自定义样式 */
.pagination .page-link {
  color: #4CAF50;
  cursor: pointer;
}

.pagination .page-item.active .page-link {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;
}

.pagination .page-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(76, 175, 80, 0.25);
}

.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
}
</style>
