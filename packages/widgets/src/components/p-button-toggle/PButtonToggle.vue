<template>
  <div class="p-button-toggle" :style="style">
    <v-btn
      v-model="value"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
      fab
      depressed
      x-large
    >
      {{ displayProps.label }}
    </v-btn>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PButtonToggle',
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
      color: value.value
        ? props.ctx.widget.display.colorTrue || '#44C47D'
        : props.ctx.widget.display.colorFalse || '#d73a49'
    }))

    const listeners = {
      ...context.$listeners,
      click: async () => writeProperty(!value.value)
    }

    return { value, attrs, style, displayProps, listeners }
  }
}
</script>

<style scoped>
.p-button-toggle {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-size: 100% 100%;
}
</style>
