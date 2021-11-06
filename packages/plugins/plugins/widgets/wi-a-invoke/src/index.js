export default {
  install: async (Vue, options) => {
    Vue.component('wi-a-invoke', () =>
      import('@netzoio/widgets/src/components/a-invoke/AInvoke.vue')
    )
  }
}
