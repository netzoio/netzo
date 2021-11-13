export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-grid', () =>
      import('@netzoio/widgets/lib/components/p-grid/PGrid.vue')
    )
  }
}
