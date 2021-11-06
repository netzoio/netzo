export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-sparkline', () => import('./PSparkline.vue'))
  }
}
