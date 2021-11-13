export default {
  install: async (Vue, options) => {
    Vue.component('wi-p-joystick', () => import('./PJoystick.vue'))
  }
}
