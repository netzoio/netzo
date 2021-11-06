export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-stepper', () =>
      import('@netzoio/widgets/src/components/p-stepper/PStepper.vue')
    )
  }
}
