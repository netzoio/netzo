export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-eventlog', () => import('./ELog.vue'))
  }
}
