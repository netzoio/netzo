export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-list-dashboards', () =>
      import(
        '@netzoio/widgets/lib/components/u-list-dashboards/UListDashboards.vue'
      )
    )
  }
}
