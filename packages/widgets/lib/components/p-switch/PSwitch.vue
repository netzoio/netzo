<template>
  <div class="p-switch" :style="style">
    <v-switch
      v-model="value"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
    >
      {{ displayProps.label }}
    </v-switch>
  </div>
</template>

<script>
import { ref, computed, watch, reactive } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PSwitch',
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

    const listeners = {
      ...context.$listeners,
      change: async (value) => writeProperty(value)
    }

    return {
      value,
      attrs,
      style,
      displayProps,
      listeners
    }
  }
}
</script>

<style scoped>
.p-switch {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.p-switch .v-input--selection-controls {
  margin-top: 0;
  padding: 0;
}
</style>
