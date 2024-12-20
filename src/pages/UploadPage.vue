<template>
  <div class="upload-page">
    <div class="page-header">
      <h2>上传管理</h2>
    </div>

    <div class="upload-container">
      <CategorySelector v-model="selectedCategory" />
      
      <div 
        class="upload-area" 
        :class="{ 
          'is-dragging': isDragging,
          'is-disabled': isUploading 
        }"
      >
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/gif"
          class="file-input"
          @change="handleFileChange"
        >
        
        <div 
          class="upload-placeholder"
          @click="triggerFileInput"
        >
          <i class="fas fa-cloud-upload-alt"></i>
          <p>点击或拖拽图片到此处上传</p>
          <p class="upload-tip">支持 jpg、png、gif 格式，单个文件不超过5MB</p>
        </div>
      </div>

      <!-- 预览区域 -->
      <div v-if="previewFiles.length" class="preview-area">
        <el-scrollbar height="300px">
          <div class="preview-grid">
            <div v-for="(file, index) in previewFiles" :key="index" class="preview-item">
              <div class="preview-image">
                <img :src="file.url" :alt="file.name">
                <div class="preview-overlay">
                  <button class="remove-btn" @click.stop="removeFile(index)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="preview-info">
                <el-tooltip :content="file.name" placement="bottom">
                  <span class="file-name">{{ file.name }}</span>
                </el-tooltip>
                <span class="file-size">{{ formatFileSize(file.size) }}</span>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>

      <!-- 上传信息和按钮 -->
      <div v-if="selectedFiles.length" class="upload-info">
        <div class="file-info">
          <el-tag type="info" size="large">
            <i class="fas fa-images"></i>
            已选择 {{ selectedFiles.length }} 个文件
          </el-tag>
        </div>
        <div class="action-buttons">
          <el-button @click="clearFiles">
            清空
          </el-button>
          <el-button 
            type="primary" 
            @click="handleUpload"
            :loading="isUploading"
            :disabled="!selectedCategory"
          >
            {{ isUploading ? '上传中...' : '开始上传' }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 上传进度 -->
    <el-dialog
      v-model="showProgress"
      title="上传进度"
      :close-on-click-modal="false"
      :show-close="false"
      width="400px"
    >
      <div class="progress-info">
        <el-progress 
          :percentage="uploadProgress" 
          :status="uploadStatus"
        />
        <p class="progress-text">{{ progressText }}</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeProgress" :disabled="isUploading">
            关闭
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUploadStore } from '../store/upload'
import CategorySelector from '../components/upload/CategorySelector.vue'
import { validateFiles } from '../utils/validators'

const uploadStore = useUploadStore()
const selectedCategory = ref('')
const fileInput = ref(null)
const selectedFiles = ref([])
const isDragging = ref(false)
const isUploading = ref(false)
const previewFiles = ref([])
const showProgress = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref('')

// 计算进度文本
const progressText = computed(() => {
  if (uploadStatus.value === 'success') return '上传完成！'
  if (uploadStatus.value === 'exception') return '上传失败'
  return `正在上传第 ${uploadProgress.value}%`
})

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 处理文件选择
const handleFileChange = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
  event.target.value = '' // 重置 input
}

// 处理拖拽
const handleDrop = (event) => {
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

// 处理文件
const processFiles = (files) => {
  const validationResult = validateFiles(files)
  if (!validationResult.valid) {
    ElMessage.error(validationResult.error)
    return
  }
  
  selectedFiles.value = files
  previewFiles.value = Array.from(files).map(file => ({
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file)
  }))
}

// 移除文件
const removeFile = (index) => {
  URL.revokeObjectURL(previewFiles.value[index].url)
  previewFiles.value.splice(index, 1)
  selectedFiles.value = selectedFiles.value.filter((_, i) => i !== index)
}

// 清空文件
const clearFiles = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要清空所有已选择的文件吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    previewFiles.value.forEach(file => {
      URL.revokeObjectURL(file.url)
    })
    previewFiles.value = []
    selectedFiles.value = []
    fileInput.value.value = ''
  } catch {
    // 用户取消
  }
}

// 关闭进度弹窗
const closeProgress = () => {
  if (!isUploading.value) {
    showProgress.value = false
    uploadProgress.value = 0
    uploadStatus.value = ''
  }
}

// 上传文件
const handleUpload = async () => {
  if (!selectedCategory.value) {
    ElMessage.warning('请先选择分类')
    return
  }

  if (!selectedFiles.value.length) {
    ElMessage.warning('请先选择文件')
    return
  }

  try {
    isUploading.value = true
    showProgress.value = true
    uploadStatus.value = ''
    
    // 模拟上传进度
    const timer = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += 10
      }
    }, 300)

    await uploadStore.uploadImages(selectedFiles.value, selectedCategory.value)
    
    clearInterval(timer)
    uploadProgress.value = 100
    uploadStatus.value = 'success'
    
    ElMessage.success('上传成功')
    
    // 清理预览
    previewFiles.value.forEach(file => {
      URL.revokeObjectURL(file.url)
    })
    previewFiles.value = []
    selectedFiles.value = []
    
    // 延迟关闭进度弹窗
    setTimeout(() => {
      showProgress.value = false
      uploadProgress.value = 0
      uploadStatus.value = ''
    }, 1500)

  } catch (error) {
    uploadStatus.value = 'exception'
    ElMessage.error(error.message || '上传失败')
  } finally {
    isUploading.value = false
  }
}

// 修改触发文件选择的方法
const triggerFileInput = () => {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.upload-page {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
  
  h2 {
    margin: 0;
    font-size: 20px;
    color: $text-primary;
  }
}

.upload-container {
  max-width: 800px;
  margin: 0 auto;
}

.upload-area {
  margin-top: 20px;
  border: 2px dashed $border-color;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &.is-dragging {
    border-color: $primary-color;
    background: #f5f7fa;
  }
  
  &.is-loading {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.file-input {
  display: none;
}

.upload-placeholder {
  cursor: pointer;
  padding: 20px;
  
  &:hover {
    opacity: 0.8;
  }
  
  i {
    font-size: 48px;
    color: $text-secondary;
    margin-bottom: 16px;
  }
  
  p {
    margin: 8px 0;
    color: $text-regular;
  }
  
  .upload-tip {
    font-size: 12px;
    color: $text-secondary;
  }
}

.loading-indicator {
  i {
    font-size: 36px;
    color: $primary-color;
    margin-bottom: 12px;
  }
  
  p {
    color: $text-regular;
    margin: 0;
  }
}

.selected-files {
  p {
    margin: 0 0 16px;
    color: $text-regular;
  }
}

.upload-info {
  margin-top: 20px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
  .file-info {
    display: flex;
    align-items: center;
    color: $text-regular;
    
    i {
      font-size: 20px;
      margin-right: 8px;
      color: $primary-color;
    }
  }
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  background: $primary-color;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    background: var(--primary-color-dark);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  i {
    font-size: 14px;
  }
}

.preview-area {
  margin-top: 20px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 8px;
}

.preview-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid $border-color;
  
  .preview-image {
    position: relative;
    height: 180px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    
    .preview-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    &:hover .preview-overlay {
      opacity: 1;
    }
  }
  
  .preview-info {
    padding: 8px;
    
    .file-name {
      display: block;
      font-size: 13px;
      color: $text-primary;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .file-size {
      font-size: 12px;
      color: $text-secondary;
    }
  }
}

.remove-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  font-size: 16px;
  opacity: 0.8;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 1;
  }
}

.upload-info {
  margin-top: 20px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
  .file-info {
    i {
      margin-right: 8px;
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 12px;
  }
}

.progress-info {
  padding: 20px;
  text-align: center;
  
  .progress-text {
    margin-top: 16px;
    color: $text-regular;
  }
}

.is-disabled {
  pointer-events: none;
  opacity: 0.7;
}
</style> 