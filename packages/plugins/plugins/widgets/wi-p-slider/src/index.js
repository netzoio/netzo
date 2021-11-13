export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-slider', () =>
      import('@netzoio/widgets/lib/components/p-slider/PSlider.vue')
    )
  }
}
