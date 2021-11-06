<template>
  <div class="p-sparkline" :style="style">
    <v-card-subtitle class="pt-0 pb-0 font-weight-bold">
      {{ displayProps.label }}
    </v-card-subtitle>
    <v-spacer />
    <div class="value-display pt-1 pl-4">
      <span class="text-h3">
        {{ value[value.length - 1] }}
      </span>
      <span v-if="displayProps.unit" class="grey--text text-uppercase">
        {{ displayProps.unit }}
      </span>
    </div>
    <v-sparkline
      v-model="value"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
    >
      <!-- <template #label></template> -->
    </v-sparkline>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'
import { percentToHSLColor } from '../../utils'

export default {
  name: 'PSparkline',
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
      value,
      readProperty,
      writeProperty,
      observeProperty
    } = useWotProperty(props.ctx, [], 'time-series')

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
      label: props.ctx.widget.display.label,
      color: props.ctx.widget.display.gradient
        ? percentToHSLColor(value.value, 0, 100)
        : props.ctx.widget.display.color,
      fill: props.ctx.widget.display.fill,
      lineWidth: props.ctx.widget.display.lineWidth,
      smooth: props.ctx.widget.display.smooth,
      autoDraw: props.ctx.widget.display.autoDraw,
      unit: props.ctx.widget.display.unit
    }))

    const listeners = computed(() => ({ ...context.$listeners }))

    return { value, attrs, style, displayProps, listeners }
  }
}
</script>

<style scoped>
.p-sparkline {
  width: 100%;
  height: 100%;
}

.p-sparkline .value-display {
  position: absolute;
  top: 28; /* offset toolbar */
  left: 0;
}

svg {
  width: 100%;
  height: 100%;
}
</style>
