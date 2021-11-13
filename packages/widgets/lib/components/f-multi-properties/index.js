export default {
  install: async (Vue, options) => {
    Vue.component('wi-f-multi-properties', () =>
      import('./FMultiProperties.vue')
    )
  }
}
