export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-slider', () => import('./PSlider.vue'))
  }
}
