export default {
  install: async (Vue, options) => {
    Vue.component('wi-f-multi-properties', () =>
      import(
        '@netzoio/widgets/lib/components/f-multi-properties/FMultiProperties.vue'
      )
    )
  }
}
