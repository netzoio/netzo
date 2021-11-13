<template>
  <div class="p-slider" :style="style">
    <v-slider
      v-model="value"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PSlider',
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
      hideDetails: true,
      color: props.ctx.widget.display.color,
      vertical: props.ctx.widget.display.vertical,
      prependIcon: !props.ctx.widget.display.hideButtons && 'remove',
      appendIcon: !props.ctx.widget.display.hideButtons && 'add'
    }))

    const listeners = computed(() => ({
      ...context.$listeners,
      change: async (value) => writeProperty(value),
      'click:prepend': async () => writeProperty(value.value - 1),
      'click:append': async () => writeProperty(value.value + 1)
    }))

    return { value, attrs, style, displayProps, listeners }
  }
}
</script>

<style scoped>
.p-slider {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.p-slider > div {
  /* add 12px padding to sides */
  width: calc(100% - 24px) !important;
}
</style>
