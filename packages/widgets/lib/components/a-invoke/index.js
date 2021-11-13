export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-button', () => import('./AInvoke.vue'))
  }
}
