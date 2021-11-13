export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-map', () => import('./PMap.vue'))
  }
}
