export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-button-toggle', () => import('./PButtonToggle.vue'))
  }
}
