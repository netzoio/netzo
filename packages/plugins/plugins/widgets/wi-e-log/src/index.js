export default {
  install: async (Vue, options) => {
    Vue.component('wi-e-log', () =>
      import('@netzoio/widgets/src/components/e-log/ELog.vue')
    )
  }
}
