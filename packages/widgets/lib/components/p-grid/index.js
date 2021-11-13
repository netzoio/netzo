export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-grid', () => import('./PGrid.vue'))
  }
}
