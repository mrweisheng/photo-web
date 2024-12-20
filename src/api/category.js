import api from './index'

export const categoryApi = {
  // 获取所有分类
  getCategories() {
    return api.get('/categories')
  },

  // 创建分类
  createCategory(name) {
    return api.post('/categories', { name })
  },

  // 更新分类
  updateCategory(id, name) {
    return api.put(`/categories/${id}`, { name })
  },

  // 删除分类
  deleteCategory(id) {
    return api.delete(`/categories/${id}`)
  }
} 