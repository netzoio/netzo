export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-radio', () =>
      import('@netzoio/widgets/lib/components/p-radio/PRadio.vue')
    )
  }
}
