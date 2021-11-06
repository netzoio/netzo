export default {
  install: async (Vue, options) => {
    Vue.component('wi-f-multi-events', () =>
      import('@netzoio/widgets/src/components/f-multi-events/FMultiEvents.vue')
    )
  }
}
