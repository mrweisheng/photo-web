export class AppError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code
  }
}

export function setupErrorHandler(app) {
  app.config.errorHandler = (err, vm, info) => {
    console.error('Vue Error:', err)
    console.error('Error Info:', info)
    
    // 这里可以添加错误上报逻辑
    
    // 如果是自定义错误，可以进行特殊处理
    if (err instanceof AppError) {
      // 处理特定类型的错误
    }
  }
  
  // 处理未捕获的Promise错误
  window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled Promise Rejection:', event.reason)
  })
} 