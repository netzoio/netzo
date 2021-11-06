export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-progress', () =>
      import('@netzoio/widgets/src/components/p-progress/PProgress.vue')
    )
  }
}
