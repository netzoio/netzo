export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-chart', () => import('./PChart.vue'))
  }
}
