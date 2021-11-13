export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-switch', () => import('./PSwitch.vue'))
  }
}
