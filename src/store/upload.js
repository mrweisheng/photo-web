import { defineStore } from 'pinia'
import { imageApi } from '../api/image'

export const useUploadStore = defineStore('upload', {
  state: () => ({
    uploadFiles: [],
    recentUploads: [],
    currentPage: 1,
    pageSize: 10,
    total: 0
  }),

  actions: {
    async uploadImages(formData) {
      try {
        const formDataObj = {}
        formData.forEach((value, key) => {
          formDataObj[key] = value
        })
        console.log('FormData in store:', formDataObj)

        const { data } = await imageApi.uploadImages(formData)
        return data
      } catch (err) {
        throw err
      }
    },

    async fetchImageCovers(page = 1) {
      try {
        const { data, pagination } = await imageApi.getImageCovers(page, this.pageSize)
        this.recentUploads = data
        this.currentPage = pagination.current
        this.total = pagination.total
        return data
      } catch (err) {
        throw err
      }
    }
  }
}) 