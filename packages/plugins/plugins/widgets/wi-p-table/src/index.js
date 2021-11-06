export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-table', () =>
      import('@netzoio/widgets/src/components/p-table/PTable.vue')
    )
  }
}
