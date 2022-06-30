export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-map', () =>
      import('@netzoio/widgets/src/components/p-map/PMap.vue')
    )
  }
}
