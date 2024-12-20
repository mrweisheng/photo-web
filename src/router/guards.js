export function setupRouteGuards(router) {
  // 全局前置守卫
  router.beforeEach((to, from, next) => {
    // 设置页面标题
    document.title = to.meta.title || '图片管理系统'
    
    // 这里可以添加其他路由守卫逻辑，比如：
    // - 权限验证
    // - 登录状态检查
    // - 页面加载进度条
    
    next()
  })
  
  // 全局后置守卫
  router.afterEach((to, from) => {
    // 滚动到页面顶部
    window.scrollTo(0, 0)
  })
} 