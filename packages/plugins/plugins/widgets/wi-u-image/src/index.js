export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-image', () =>
      import('@netzoio/widgets/lib/components/u-image/UImage.vue')
    )
  }
}
