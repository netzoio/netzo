export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-table', () => import('./PTable.vue'))
  }
}
