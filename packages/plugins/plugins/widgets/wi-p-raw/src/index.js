export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-raw', () =>
      import('@netzoio/widgets/src/components/p-raw/PRaw.vue')
    )
  }
}
