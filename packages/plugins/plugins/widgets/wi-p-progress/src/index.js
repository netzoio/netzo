export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-progress', () =>
      import('@netzoio/widgets/lib/components/p-progress/PProgress.vue')
    )
  }
}
