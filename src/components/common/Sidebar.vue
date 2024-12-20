<template>
  <aside 
    class="sidebar" 
    :class="{ 
      'mobile': isMobile,
      'visible': isMenuVisible 
    }"
    v-show="!isMobile || isMenuVisible"
    @click.self="$emit('close')"
  >
    <div class="sidebar-content">
      <div class="sidebar-header">
        <h1 v-if="!isMobile">图片管理系统</h1>
        <button v-else class="close-btn" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <nav class="sidebar-menu">
        <router-link 
          to="/" 
          class="menu-item" 
          active-class="router-link-active"
          :exact="true"
          @click="$emit('close')"
        >
          <i class="fas fa-home"></i>
          <span>首页</span>
        </router-link>
        
        <router-link 
          to="/category" 
          class="menu-item"
          active-class="router-link-active"
          :exact="true"
          @click="$emit('close')"
        >
          <i class="fas fa-folder"></i>
          <span>分类管理</span>
        </router-link>
        
        <router-link 
          to="/upload" 
          class="menu-item"
          active-class="router-link-active"
          :exact="true"
          @click="$emit('close')"
        >
          <i class="fas fa-cloud-upload-alt"></i>
          <span>上传管理</span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },
  isMenuVisible: {
    type: Boolean,
    default: true
  }
})

defineEmits(['close'])
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background: var(--component-background);
  border-right: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  
  &.mobile {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    
    .sidebar-content {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 240px;
      background: var(--component-background);
      transform: translateX(0);
      transition: transform 0.3s ease;
      box-shadow: 2px 0 8px var(--shadow-color);
    }
    
    &:not(.visible) {
      display: none;
      
      .sidebar-content {
        transform: translateX(-100%);
      }
    }
  }
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.close-btn {
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

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1 {
    margin: 0;
    font-size: 18px;
    color: var(--text-primary);
  }
}

.sidebar-menu {
  padding: 20px 0;
  flex: 1;
  overflow-y: auto;
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: var(--text-regular);
  text-decoration: none;
  transition: all 0.3s ease;
  
  i {
    margin-right: 12px;
    width: 20px;
    text-align: center;
  }
  
  &:hover {
    background: var(--background-color);
    color: var(--primary-color);
  }
  
  &.router-link-active {
    color: var(--primary-color);
    background: var(--primary-color-light, #ecf5ff);
    font-weight: 500;
    
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 24px;
      background: var(--primary-color);
      border-radius: 2px 0 0 2px;
    }
  }
}
</style> 