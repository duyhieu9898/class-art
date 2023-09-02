import { defineStore } from 'pinia'

export interface IAppState {}

export const useAppStore = defineStore('app', {
  state: (): IAppState => ({}),
  getters: {},
  actions: {
    async fetchData() {
      const { data } = await useFetch('/api/class')
      console.log('data', data.value)
    },
  },
})
