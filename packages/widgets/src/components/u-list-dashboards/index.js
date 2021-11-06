export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-ListDashboards', () => import('./UListDashboards.vue'))
  }
}
