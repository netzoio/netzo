export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-checkbox', () =>
      import('@netzoio/widgets/lib/components/p-checkbox/PCheckbox.vue')
    )
  }
}
