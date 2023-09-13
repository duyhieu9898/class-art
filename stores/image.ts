import { defineStore } from 'pinia'
import { IImage } from '~/utils/types'

export interface IAppState {
  imageList: IImage[]
  loading: boolean
}

export const useImageStore = defineStore('image-store', {
  state: (): IAppState => ({
    imageList: [],
    loading: false,
  }),
  getters: {},
  actions: {
    async fetchImageList(): Promise<string[]> {
      const { data } = await useFetch('/api/image-product').catch(
        (error) => error.data,
      )
      const resData = data?.value?.data
      this.imageList = resData
      return resData
    },

    async addProductImage(imageItem: IImage) {
      this.loading = true
      const res = await $fetch('/api/image-product', {
        method: 'post',
        body: { imageItem },
      }).catch((error) => error.data)
      this.loading = false
      this.imageList.push(imageItem)
      return res
    },
    async deleteProductImage(imageItem: IImage, index: number) {
      this.loading = true
      const res = await $fetch('/api/image-product', {
        method: 'delete',
        body: { imageItem },
      }).catch((error) => error.data)
      this.loading = false
      this.imageList.splice(index, 1)
      return res
    },
  },
})
