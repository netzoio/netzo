<template>
  <div class="p-checkbox" :style="style">
    <v-checkbox
      v-model="value"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
    >
      {{ displayProps.label }}
    </v-checkbox>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PCheckbox',
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
      label: props.ctx.widget.display.label,
      color: props.ctx.widget.display.color
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
.p-checkbox {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.p-checkbox .v-input--selection-controls {
  margin-top: 0;
  padding: 0;
}
</style>
