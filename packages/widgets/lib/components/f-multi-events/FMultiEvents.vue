<template>
  <div class="f-multi-events" :style="style">
    {{ form }}
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useWidget, useWotForm } from '../../use'

export default {
  name: 'FMultiEvents',
  props: {
    ctx: { type: Object, required: true }
  },
  emits: [],
  setup(props, context) {
    const { uid, i, _id, $console, topic } = useWidget(props.ctx)

    const {
      form,
      // wot:
      thing,
      name,
      options
      // wot-form:
    } = useWotForm(props.ctx)

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

    return {
      form,
      name,
      attrs,
      style,
      displayProps,
      listeners
    }
  }
}
</script>
