export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-webcontent', () =>
      import('@netzoio/widgets/src/components/u-webcontent/UWebcontent.vue')
    )
  }
}
