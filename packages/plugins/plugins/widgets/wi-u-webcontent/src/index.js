export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-webcontent', () =>
      import('@netzoio/widgets/lib/components/u-webcontent/UWebcontent.vue')
    )
  }
}
