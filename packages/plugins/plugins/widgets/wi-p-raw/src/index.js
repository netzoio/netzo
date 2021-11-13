export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-raw', () =>
      import('@netzoio/widgets/lib/components/p-raw/PRaw.vue')
    )
  }
}
