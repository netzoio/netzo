export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-grid', () =>
      import('@netzoio/widgets/src/components/p-grid/PGrid.vue')
    )
  }
}
