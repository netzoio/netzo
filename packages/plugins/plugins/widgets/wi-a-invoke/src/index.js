export default {
  install: async (Vue, options) => {
    Vue.component('wi-a-invoke', () =>
      import('@netzoio/widgets/lib/components/a-invoke/AInvoke.vue')
    )
  }
}
