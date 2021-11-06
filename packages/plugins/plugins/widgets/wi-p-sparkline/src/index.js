export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-sparkline', () =>
      import('@netzoio/widgets/src/components/p-sparkline/PSparkline.vue')
    )
  }
}
