<template>
  <div class="home-page">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <h3>总图片数</h3>
          <div class="icon primary">
            <i class="fas fa-images"></i>
          </div>
        </div>
        <div class="stat-value">{{ stats.totalImages || 0 }}</div>
        <div class="stat-label">已上传的图片总数</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>总组数</h3>
          <div class="icon primary">
            <i class="fas fa-layer-group"></i>
          </div>
        </div>
        <div class="stat-value">{{ stats.totalGroups || 0 }}</div>
        <div class="stat-label">上传的图片组数</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>分类数</h3>
          <div class="icon success">
            <i class="fas fa-folder"></i>
          </div>
        </div>
        <div class="stat-value">{{ stats.totalCategories || 0 }}</div>
        <div class="stat-label">创建的分类��数</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>本月上传</h3>
          <div class="icon warning">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
        </div>
        <div class="stat-value">{{ stats.monthlyUploads || 0 }}</div>
        <div class="stat-label">本月上传的图片数量</div>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-header">
        <h3>最近上传</h3>
      </div>
      <div class="recent-uploads">
        <div v-if="recentImages.length" class="uploads-grid">
          <div 
            v-for="image in recentImages" 
            :key="image.id" 
            class="image-card"
          >
            <img :src="image.cover_url" :alt="image.category_name">
            <div class="image-info">
              <span class="category-name">{{ image.category_name }}</span>
              <div class="upload-meta">
                <div class="meta-left">
                  <span class="image-count">{{ image.image_count }}张图片</span>
                  <button 
                    class="delete-btn"
                    @click="handleDelete(image.id)"
                    title="删除"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <span class="upload-time">{{ formatDate(image.uploaded_at) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          暂无上传记录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStatsStore } from '../store/stats'
import { imageApi } from '../api/image'
import { ElMessageBox, ElMessage } from 'element-plus'

const statsStore = useStatsStore()
const stats = ref({
  totalImages: 0,
  totalCategories: 0,
  monthlyUploads: 0
})
const recentImages = ref([])

// 获取统计数据
const fetchStats = async () => {
  try {
    stats.value = await statsStore.fetchStats()
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

// 获取最近上传
const fetchRecentImages = async () => {
  try {
    const response = await imageApi.getImageCovers(1, 8) // 获取最近8张
    recentImages.value = response.data
  } catch (error) {
    console.error('获取最近上传失败:', error)
  }
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 删除图片组
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这组图片吗？删除后不可恢复。',
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await imageApi.deleteImage(id)
    ElMessage.success('删除成功')
    
    // 重新获取数据
    await fetchStats()
    await fetchRecentImages()
    
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || '删除失败')
    }
  }
}

onMounted(() => {
  fetchStats()
  fetchRecentImages()
})
</script>

<style lang="scss" scoped>
.home-page {
  padding: 24px;
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
}

.stat-card {
  background: var(--component-background);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px var(--shadow-color);
  
  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    
    h3 {
      margin: 0;
      font-size: 16px;
      color: var(--text-primary);
    }
    
    .icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      
      &.primary {
        background: var(--primary-color);
        color: #fff;
        
        &:hover {
          background: var(--primary-color-dark);
        }
      }
      
      &.success {
        background: var(--success-color);
        color: #fff;
        
        &:hover {
          background: var(--success-color-dark);
        }
      }
      
      &.warning {
        background: var(--warning-color);
        color: #fff;
        
        &:hover {
          background: var(--warning-color-dark);
        }
      }
    }
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }
  
  .stat-label {
    font-size: 14px;
    color: var(--text-secondary);
  }
}

.chart-container {
  background: var(--component-background);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px var(--shadow-color);
  
  .chart-header {
    margin-bottom: 20px;
    
    h3 {
      margin: 0;
      font-size: 18px;
      color: var(--text-primary);
    }
  }
}

.recent-uploads {
  .uploads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    
    @media (max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }
  
  .image-card {
    background: var(--background-color);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;
    
    &:hover {
      transform: translateY(-4px);
    }
    
    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      display: block;
    }
    
    .image-info {
      padding: 12px;
      
      .category-name {
        display: block;
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 4px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .upload-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: var(--text-secondary);
        
        .image-count {
          color: var(--primary-color);
        }
      }
    }
  }
  
  .no-data {
    text-align: center;
    padding: 40px;
    color: var(--text-secondary);
    font-size: 14px;
  }
}

@media (max-width: $breakpoint-sm) {
  .home-page {
    padding: 16px;
  }
  
  .chart-container {
    padding: 16px;
  }
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.delete-btn {
  background: none;
  border: none;
  padding: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: var(--danger-color);
  }
  
  i {
    font-size: 14px;
  }
}
</style> 