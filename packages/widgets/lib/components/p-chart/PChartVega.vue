<template>
  <div class="p-chart" :style="style">
    <!-- <vega-lite :data="values" mark="bar" :encoding="encoding" /> -->
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use' // import { VegaLiteComponent } from 'vue-vega'

export default {
  name: 'PChartVega',
  // components: { VegaLiteComponent },
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

    // TODO: a function to compile passed in ctx.wot to vega spec
    function compileWotToVega(wot) {
      // const map = ``
      // const vegaJson = jsonata(map).evaluate(device)
      // return vegaJson
    }

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

    const def = ref(null)

    const values = ref([
      { a: 'A', b: 28 },
      { a: 'B', b: 55 },
      { a: 'C', b: 43 },
      { a: 'D', b: 91 },
      { a: 'E', b: 81 },
      { a: 'F', b: 53 },
      { a: 'G', b: 19 },
      { a: 'H', b: 87 },
      { a: 'I', b: 52 }
    ])

    const encoding = ref({
      x: { field: 'a', type: 'ordinal' },
      y: { field: 'b', type: 'quantitative' }
    })

    return {
      value,
      displayProps,
      attrs,
      style,
      listeners,
      // chart:
      values,
      encoding
    }
  }
}
</script>

<style scoped>
.p-chart {
  width: 100%;
  height: 100%;
}
</style>
