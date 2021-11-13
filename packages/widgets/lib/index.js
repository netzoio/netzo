// registers components globally (imports with side effects) and re-imports component classes
// NOTE: this file is vite.js friendly, meaning applications using vite.js in development
// can import components from this file without any additional code

// hack required by vite.js for consuming package
const getUrl = (url) => new URL(url, import.meta.url).href

export default {
  install(Vue, options) {
    Vue.component('wi-u-image', () =>
      import(getUrl(/* @vite-ignore */ './components/u-image/UImage.vue'))
    )
    Vue.component('wi-u-list-things', () =>
      import(
        getUrl(/* @vite-ignore */ './components/u-list-things/UListThings.vue')
      )
    )
    Vue.component('wi-u-webcontent', () =>
      import(
        getUrl(/* @vite-ignore */ './components/u-webcontent/UWebcontent.vue')
      )
    )
    Vue.component('wi-a-invoke', () =>
      import(getUrl(/* @vite-ignore */ './components/a-invoke/AInvoke.vue'))
    )
    Vue.component('wi-p-button-toggle', () =>
      import(
        getUrl(
          /* @vite-ignore */ './components/p-button-toggle/PButtonToggle.vue'
        )
      )
    )
    Vue.component('wi-p-chart', () =>
      import(getUrl(/* @vite-ignore */ './components/p-chart/PChart.vue'))
    )
    Vue.component('wi-p-checkbox', () =>
      import(getUrl(/* @vite-ignore */ './components/p-checkbox/PCheckbox.vue'))
    )
    Vue.component('wi-p-content', () =>
      import(getUrl(/* @vite-ignore */ './components/p-content/PContent.vue'))
    )
    Vue.component('wi-e-log', () =>
      import(getUrl(/* @vite-ignore */ './components/e-log/ELog.vue'))
    )
    Vue.component('wi-f-multi-events', () =>
      import(
        getUrl(
          /* @vite-ignore */ './components/f-multi-events/FMultiEvents.vue'
        )
      )
    )
    Vue.component('wi-f-multi-properties', () =>
      import(
        getUrl(
          /* @vite-ignore */ './components/f-multi-properties/FMultiProperties.vue'
        )
      )
    )
    Vue.component('wi-l-display', () =>
      import(getUrl(/* @vite-ignore */ './components/l-display/LDisplay.vue'))
    )
    Vue.component('wi-p-grid', () =>
      import(getUrl(/* @vite-ignore */ './components/p-grid/PGrid.vue'))
    )
    Vue.component('wi-p-joystick', () =>
      import(getUrl(/* @vite-ignore */ './components/p-joystick/PJoystick.vue'))
    )
    Vue.component('wi-p-map', () =>
      import(getUrl(/* @vite-ignore */ './components/p-map/PMap.vue'))
    )
    Vue.component('wi-p-progress', () =>
      import(getUrl(/* @vite-ignore */ './components/p-progress/PProgress.vue'))
    )
    Vue.component('wi-p-radio', () =>
      import(getUrl(/* @vite-ignore */ './components/p-radio/PRadio.vue'))
    )
    Vue.component('wi-p-slider', () =>
      import(getUrl(/* @vite-ignore */ './components/p-slider/PSlider.vue'))
    )
    Vue.component('wi-p-sparkline', () =>
      import(
        getUrl(/* @vite-ignore */ './components/p-sparkline/PSparkline.vue')
      )
    )
    Vue.component('wi-p-stepper', () =>
      import(getUrl(/* @vite-ignore */ './components/p-stepper/PStepper.vue'))
    )
    Vue.component('wi-p-switch', () =>
      import(getUrl(/* @vite-ignore */ './components/p-switch/PSwitch.vue'))
    )
    Vue.component('wi-p-table', () =>
      import(getUrl(/* @vite-ignore */ './components/p-table/PTable.vue'))
    )
  }
}
