export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-list-things', () =>
      import('@netzoio/widgets/src/components/u-list-things/UListThings.vue')
    )
  }
}
