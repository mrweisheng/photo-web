<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div 
        class="progress-inner" 
        :style="{ width: `${percentage}%` }"
        :class="{ 'is-success': status === 'success', 'is-error': status === 'error' }"
      ></div>
    </div>
    <div class="progress-info">
      <span class="progress-text">{{ text }}</span>
      <span class="progress-percentage">{{ percentage }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  percentage: {
    type: Number,
    required: true,
    validator: (val) => val >= 0 && val <= 100
  },
  status: {
    type: String,
    default: 'normal',
    validator: (val) => ['normal', 'success', 'error'].includes(val)
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.progress-container {
  margin: 10px 0;
}

.progress-bar {
  height: 6px;
  background: #ebeef5;
  border-radius: 100px;
  overflow: hidden;
}

.progress-inner {
  height: 100%;
  background: $primary-color;
  transition: width 0.3s ease;
  
  &.is-success {
    background: $success-color;
  }
  
  &.is-error {
    background: $danger-color;
  }
}

.progress-info {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: $text-secondary;
}
</style> 