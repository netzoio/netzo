export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-table', () =>
      import('@netzoio/widgets/lib/components/p-table/PTable.vue')
    )
  }
}
