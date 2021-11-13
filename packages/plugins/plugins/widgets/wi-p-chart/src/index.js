export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-chart', () =>
      import('@netzoio/widgets/lib/components/p-chart/PChart.vue')
    )
  }
}
