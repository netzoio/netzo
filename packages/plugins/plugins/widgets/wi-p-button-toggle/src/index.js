export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-button-toggle', () =>
      import(
        '@netzoio/widgets/src/components/p-button-toggle/PButtonToggle.vue'
      )
    )
  }
}
