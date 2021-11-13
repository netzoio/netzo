export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-sparkline', () =>
      import('@netzoio/widgets/lib/components/p-sparkline/PSparkline.vue')
    )
  }
}
