export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-stepper', () =>
      import('@netzoio/widgets/lib/components/p-stepper/PStepper.vue')
    )
  }
}
