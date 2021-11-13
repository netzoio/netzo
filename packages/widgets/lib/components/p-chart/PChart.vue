<template>
  <div class="p-chart" :style="style">
    {{ value }}
    <vue-apexchart
      :options="chartOptions"
      :series="value"
      class="apexchart-chart"
    ></vue-apexchart>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PChart',
  components: {
    VueApexchart: () => import('vue-apexcharts')
  },
  props: {
    ctx: { type: Object, required: true }
  },
  emits: [],
  setup(props, context) {
    const { uid, i, _id, $console, topic } = useWidget(props.ctx)

    const {
      property,
      // wot:
      thing,
      name,
      options,
      // wot-property:
      isValidInput,
      value: latestValue,
      readProperty,
      writeProperty,
      observeProperty
    } = useWotProperty(props.ctx, [])

    const value = ref([])
    watch(
      latestValue,
      (latestValue) => (value.value = [...value.value, latestValue]),
      { deep: true, immediate: true }
    )

    const attrs = computed(() => ({
      ...context.$attrs
      // TODO: replace listeners with vue3 $attrs (class, style, onClick, onFocus)
    }))

    const style = computed(() => ({
      backgroundImage: `url('${props.ctx.widget.display.bgImageUrl}')`,
      color: props.ctx.widget.display.textColor
    }))

    const displayProps = computed(() => ({
      ...context.$props,
      color: props.ctx.widget.display.color
    }))

    const listeners = { ...context.$listeners }

    // chart: (TODO: remove)

    const chartOptions = computed(() => ({
      chart: {
        width: '100%',
        height: '100%',
        toolbar: { show: false },
        animations: { enabled: false } // performance optimization
      }
    }))

    function updateChart() {
      const max = 90
      const min = 20
      const newData = this.value[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min
      })
      // In the same way, update the value option
      this.value = [{ data: newData }]
    }

    return {
      value,
      displayProps,
      attrs,
      style,
      listeners,
      // chart: (TODO: remove)
      chartOptions,
      updateChart
    }
  }
}
</script>

<style scoped>
.p-chart {
  width: 100%;
  height: 100%;
}

.apexchart-chart {
  overflow: hidden;
}
</style>
