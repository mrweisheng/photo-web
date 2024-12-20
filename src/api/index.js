import axios from 'axios'

const api = axios.create({
  baseURL: 'http://101.34.211.156:3000/api',
  timeout: 10000,
  withCredentials: true
})

// 响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || '服务器错误'
    // 这里可以集成消息提示
    console.error(message)
    return Promise.reject(error)
  }
)

export default api 