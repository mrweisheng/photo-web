import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api'

export const useStatsStore = defineStore('stats', () => {
  const stats = ref({
    totalImages: 0,
    totalCategories: 0,
    monthlyUploads: 0
  })

  // 获取统计数据
  const fetchStats = async () => {
    try {
      const response = await api.get('/images/statistics')
      if (response.success) {
        stats.value = {
          totalImages: response.data.total_images,
          totalCategories: response.data.total_categories,
          monthlyUploads: response.data.monthly_uploads
        }
        return stats.value
      }
    } catch (error) {
      console.error('获取统计数据失败:', error)
      throw error
    }
  }

  return {
    stats,
    fetchStats
  }
}) 