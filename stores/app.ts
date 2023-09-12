import { defineStore } from 'pinia'
import { IClass } from '~/utils/types'

export interface IAppState {
  classList: IClass[]
  loading: boolean
  count: number
}

export const useAppStore = defineStore('app', {
  state: (): IAppState => ({
    classList: [],
    loading: false,
    count: 0,
  }),
  getters: {},
  actions: {
    async fetchClassList(): Promise<IClass[]> {
      const { data } = await useFetch('/api/class').catch((error) => error.data)
      const resData = data?.value?.data
      this.classList = resData
      return resData
    },

    async createClass(classItem: IClass) {
      this.loading = true
      const res = await $fetch('/api/class', {
        method: 'post',
        body: { classItem },
      }).catch((error) => error.data)
      this.loading = false
      this.classList.push(classItem)
      return res
    },
    async deleteClass(classItem: IClass, index: number) {
      this.loading = true
      const res = await $fetch('/api/class', {
        method: 'delete',
        body: { classItem },
      }).catch((error) => error.data)
      this.loading = false
      this.classList.splice(index, 1)
      return res
    },
  },
})
