<template>
  <div class="main-layout">
    <Sidebar 
      :is-mobile="isMobile"
      :is-menu-visible="isMenuVisible"
      @close="closeMenu"
    />
    <div class="main-content">
      <div class="content-header">
        <button v-if="isMobile" class="menu-btn" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </button>
        <ThemeSwitch />
      </div>
      <div class="content-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from '../components/common/Sidebar.vue'
import ThemeSwitch from '../components/common/ThemeSwitch.vue'

const isMobile = ref(false)
const isMenuVisible = ref(true)

// 检查是否为移动设备
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
  isMenuVisible.value = !isMobile.value
}

// 切换菜单显示状态
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

// 关闭菜单
const closeMenu = () => {
  if (isMobile.value) {
    isMenuVisible.value = false
  }
}

// 监听窗口大小变化
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  
  @media (max-width: $breakpoint-md) {
    position: relative;
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  
  @media (max-width: $breakpoint-md) {
    width: 100%;
  }
}

.content-header {
  height: 60px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--component-background);
  border-bottom: 1px solid var(--border-color);
  
  @media (max-width: $breakpoint-md) {
    padding: 0 16px;
  }
}

.menu-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--text-primary);
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    color: var(--primary-color);
  }
}

.content-body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--background-color);
}
</style> 