export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-progress', () => import('./PProgress.vue'))
  }
}
