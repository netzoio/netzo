<template>
  <div class="p-radio" :style="style">
    <v-radio-group v-model="value" hide-details @change="$console.log($event)">
      <v-radio
        v-bind="{ ...attrs, ...displayProps }"
        v-on="listeners"
        :value="true"
      >
        <template #label>
          {{ displayProps.labelOn }}
        </template>
      </v-radio>
      <v-radio
        v-bind="{ ...attrs, ...displayProps }"
        v-on="listeners"
        :value="false"
      >
        <template #label>
          {{ displayProps.labelOff }}
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PRadio',
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
      labelOn: props.ctx.widget.display.labelOn,
      labelOff: props.ctx.widget.display.labelOff,
      color: props.ctx.widget.display.color,
      column: props.ctx.widget.display.vertical
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
.p-radio {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.p-radio .v-input--selection-controls {
  margin-top: 0;
  padding: 0;
}
</style>
