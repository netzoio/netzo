export default {
  install: async (Vue, options) => {
    Vue.component('wi-u-list-dashboards', () =>
      import(
        '@netzoio/widgets/src/components/u-list-dashboards/UListDashboards.vue'
      )
    )
  }
}
