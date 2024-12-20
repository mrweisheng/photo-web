import api from './index'

export const imageApi = {
  // 上传图片
  uploadImages(files, categoryId) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('images', file)
    })
    formData.append('categoryId', categoryId)
    
    return api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // 获取分类下的图片
  getCategoryImages(categoryId) {
    return api.get(`/images/category/${categoryId}`)
  },

  // 获取所有图片封面（分页）
  getImageCovers(page = 1, pageSize = 10) {
    return api.get('/images/covers', {
      params: { page, pageSize }
    })
  }
} 