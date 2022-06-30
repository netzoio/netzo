export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-image', () =>
      import('@netzoio/widgets/src/components/u-image/UImage.vue')
    )
  }
}
