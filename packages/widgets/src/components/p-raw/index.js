export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-raw', () => import('./PRaw.vue'))
  }
}
