export default {
  install: async (Vue, options) => {
    Vue.component('wi-l-display', () => import('./LDisplay.vue'))
  }
}