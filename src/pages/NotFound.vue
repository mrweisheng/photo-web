<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在</p>
      <router-link to="/" class="back-btn">
        <i class="fas fa-home"></i>
        返回首页
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f5f7fa;
}

.content {
  h1 {
    font-size: 120px;
    color: $primary-color;
    margin: 0;
    line-height: 1;
  }
  
  p {
    margin: 20px 0;
    font-size: 20px;
    color: $text-regular;
  }
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: $primary-color;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
  
  &:hover {
    background: darken($primary-color, 10%);
  }
}
</style> 