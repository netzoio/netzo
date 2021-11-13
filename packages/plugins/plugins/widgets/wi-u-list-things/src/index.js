export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-list-things', () =>
      import('@netzoio/widgets/lib/components/u-list-things/UListThings.vue')
    )
  }
}
