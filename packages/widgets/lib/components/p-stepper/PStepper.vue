<template>
  <div class="p-stepper" :style="style">
    <v-text-field
      v-model="value"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
      @keydown.enter="writeProperty(Number(value))"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PStepper',
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
      type: 'number',
      solo: true,
      flat: true,
      hideDetails: true,
      color: props.ctx.widget.display.color,
      prependInnerIcon: !props.ctx.widget.display.hideButtons && 'remove',
      appendIcon: !props.ctx.widget.display.hideButtons && 'add'
    }))

    const listeners = {
      ...context.$listeners,
      'click:prepend-inner': async () => writeProperty(value.value - 1),
      'click:append': async () => writeProperty(value.value + 1)
    }

    return { value, attrs, style, displayProps, listeners, writeProperty }
  }
}
</script>

<style scoped>
.p-stepper {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

>>> input[type='number'] {
  text-align: center;
  font-size: 28px !important;
}

>>> input[type='number']::-webkit-inner-spin-button {
  display: none !important;
}
</style>
