export default {
  install: async (Vue, options) => {
    Vue.component('wi-f-multi-events', () => import('./FMultiEvents.vue'))
  }
}
