export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-radio', () => import('./PRadio.vue'))
  }
}
