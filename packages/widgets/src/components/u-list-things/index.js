export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-ListThings', () => import('./UListThings.vue'))
  }
}
