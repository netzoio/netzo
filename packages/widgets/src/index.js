// registers components globally (imports with side effects) and re-imports component classes
export default {
  install(Vue, options) {
    Vue.component('wi-u-image', () => import('./components/u-image/UImage.vue'))
    Vue.component('wi-u-list-things', () =>
      import('./components/u-list-things/UListThings.vue')
    )
    Vue.component('wi-u-webcontent', () =>
      import('./components/u-webcontent/UWebcontent.vue')
    )
    Vue.component('wi-a-invoke', () =>
      import('./components/a-invoke/AInvoke.vue')
    )
    Vue.component('wi-p-button-toggle', () =>
      import('./components/p-button-toggle/PButtonToggle.vue')
    )
    Vue.component('wi-p-chart', () => import('./components/p-chart/PChart.vue'))
    Vue.component('wi-p-checkbox', () =>
      import('./components/p-checkbox/PCheckbox.vue')
    )
    Vue.component('wi-p-content', () =>
      import('./components/p-content/PContent.vue')
    )
    Vue.component('wi-e-log', () => import('./components/e-log/ELog.vue'))
    Vue.component('wi-f-multi-events', () =>
      import('./components/f-multi-events/FMultiEvents.vue')
    )
    Vue.component('wi-f-multi-properties', () =>
      import('./components/f-multi-properties/FMultiProperties.vue')
    )
    Vue.component('wi-l-display', () =>
      import('./components/l-display/LDisplay.vue')
    )
    Vue.component('wi-p-grid', () => import('./components/p-grid/PGrid.vue'))
    Vue.component('wi-p-joystick', () =>
      import('./components/p-joystick/PJoystick.vue')
    )
    Vue.component('wi-p-map', () => import('./components/p-map/PMap.vue'))
    Vue.component('wi-p-progress', () =>
      import('./components/p-progress/PProgress.vue')
    )
    Vue.component('wi-p-radio', () => import('./components/p-radio/PRadio.vue'))
    Vue.component('wi-p-slider', () =>
      import('./components/p-slider/PSlider.vue')
    )
    Vue.component('wi-p-sparkline', () =>
      import('./components/p-sparkline/PSparkline.vue')
    )
    Vue.component('wi-p-stepper', () =>
      import('./components/p-stepper/PStepper.vue')
    )
    Vue.component('wi-p-switch', () =>
      import('./components/p-switch/PSwitch.vue')
    )
    Vue.component('wi-p-table', () => import('./components/p-table/PTable.vue'))
  }
}
