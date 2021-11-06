export default {
  install: async (Vue, options) => {
    Vue.component('wi-l-display', () =>
      import('@netzoio/widgets/src/components/l-display/LDisplay.vue')
    )
  }
}
