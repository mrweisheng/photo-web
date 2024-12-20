<template>
  <Teleport to="body">
    <div 
      v-if="modelValue" 
      class="modal-overlay"
      @click.self="handleClose"
    >
      <div class="modal">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="handleClose">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <slot></slot>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="confirm-btn" @click="$emit('confirm')">确定</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

// 明确声明组件会触发的事件
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

// 处理关闭
const handleClose = () => {
  emit('update:modelValue', false)
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal {
  background: var(--component-background);
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 12px var(--shadow-color);
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    margin: 0;
    font-size: 16px;
    color: var(--text-primary);
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: var(--text-primary);
  }
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  padding: 8px 20px;
  background: var(--background-color);
  color: var(--text-regular);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: var(--component-background);
  }
}

.confirm-btn {
  padding: 8px 20px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: var(--primary-color-dark);
  }
}
</style> 