export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-joystick', () =>
      import('@netzoio/widgets/src/components/p-joystick/PJoystick.vue')
    )
  }
}
