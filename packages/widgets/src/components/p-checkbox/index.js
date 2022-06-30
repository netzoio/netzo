export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-checkbox', () => import('./PCheckbox.vue'))
  }
}
