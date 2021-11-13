export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-button-toggle', () =>
      import(
        '@netzoio/widgets/lib/components/p-button-toggle/PButtonToggle.vue'
      )
    )
  }
}
