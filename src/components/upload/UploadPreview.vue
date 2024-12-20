<template>
  <div class="upload-preview">
    <div class="preview-list">
      <div 
        v-for="(file, index) in files" 
        :key="index"
        class="preview-item"
      >
        <div class="preview-image">
          <img :src="file.url" :alt="file.name">
          <div class="preview-overlay">
            <button class="delete-btn" @click="removeFile(index)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="preview-info">
          <p class="file-name">{{ file.name }}</p>
          <ProgressBar
            v-if="file.status !== 'success'"
            :percentage="file.progress"
            :status="file.status"
            :text="getStatusText(file.status)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import ProgressBar from '../common/ProgressBar.vue'

const props = defineProps({
  files: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['remove'])

const removeFile = (index) => {
  emit('remove', index)
}

const getStatusText = (status) => {
  const statusMap = {
    uploading: '上传中...',
    success: '上传成功',
    error: '上传失败'
  }
  return statusMap[status] || ''
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.upload-preview {
  margin-top: 20px;
}

.preview-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.preview-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.preview-image {
  position: relative;
  padding-top: 100%;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .preview-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

.delete-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    transform: scale(1.1);
  }
}

.preview-info {
  padding: 12px;
}

.file-name {
  font-size: 14px;
  color: $text-primary;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 