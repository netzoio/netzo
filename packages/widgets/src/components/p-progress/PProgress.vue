<template>
  <div class="p-progress" :style="style">
    <v-progress-circular
      v-if="displayProps.circular"
      v-model="value"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
    >
      <v-card-subtitle class="font-weight-bold text-no-wrap">
        {{ Math.ceil(value) }}{{ displayProps.asPercentage ? '%' : '' }}
      </v-card-subtitle>
    </v-progress-circular>
    <v-progress-linear
      v-else
      v-model="value"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
    >
      <v-card-subtitle class="font-weight-bold text-no-wrap">
        {{ Math.ceil(value) }}{{ displayProps.asPercentage ? '%' : '' }}
      </v-card-subtitle>
    </v-progress-linear>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'
import { percentToHSLColor } from '../../utils'

export default {
  name: 'PProgress',
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
    } = useWotProperty(props.ctx)

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
      circular: props.ctx.widget.display.circular,
      rotate: props.ctx.widget.display.rotate,
      size: props.ctx.widget.display.size,
      width: props.ctx.widget.display.width,
      height: props.ctx.widget.display.width,
      asPercentage: props.ctx.widget.display.asPercentage
    }))

    const listeners = computed(() => ({
      ...context.$listeners,
      change: async (value) => writeProperty(value)
    }))

    return { value, attrs, style, displayProps, listeners }
  }
}
</script>

<style scoped>
.p-progress {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.p-progress > .v-progress-linear {
  /* add 12px padding to sides */
  width: calc(100% - 24px) !important;
}
</style>
