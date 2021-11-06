export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-Webcontent', () => import('./UWebcontent.vue'))
  }
}
