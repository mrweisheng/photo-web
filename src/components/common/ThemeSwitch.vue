<template>
  <button class="theme-switch" @click="toggleTheme" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'">
    <i class="fas" :class="isDark ? 'fa-sun' : 'fa-moon'"></i>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  isDark.value = savedTheme === 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
})
</script>

<style lang="scss" scoped>
.theme-switch {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--text-regular);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    transform: rotate(15deg);
  }
  
  i {
    font-size: 20px;
  }
}
</style> 