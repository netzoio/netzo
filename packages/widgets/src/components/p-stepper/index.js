export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-stepper', () => import('./PStepper.vue'))
  }
}
