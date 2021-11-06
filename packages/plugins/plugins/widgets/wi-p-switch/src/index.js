export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-switch', () =>
      import('@netzoio/widgets/src/components/p-switch/PSwitch.vue')
    )
  }
}
