import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    hoveredID: null as null | string,
  }),
  actions: {
    setHoveredID(id: string | null) {
      this.hoveredID = id
    },
  },
})