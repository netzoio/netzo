<template>
  <div
    class="u-webcontent"
    :style="style"
    :key="`${uid}-${i}-${optionsProps.src}`"
  >
    <iframe
      :src="optionsProps.src"
      :title="optionsProps.title"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
      seamless
    />
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useWidget } from '../../use'

export default {
  name: 'UWebcontent',
  props: {
    ctx: { type: Object, required: true }
  },
  emits: [],
  setup(props, context) {
    const { uid, i, _id, $console, topic } = useWidget(props.ctx)

    const attrs = computed(() => ({
      ...context.$attrs
      // TODO: replace listeners with vue3 $attrs (class, style, onClick, onFocus)
    }))

    const style = computed(() => ({
      backgroundImage: `url('${props.ctx.widget.display.bgImageUrl}')`,
      color: props.ctx.widget.display.textColor
    }))

    const displayProps = computed(() => ({
      ...context.$props
    }))

    const optionsProps = computed(() => ({
      src: props.ctx.widget.options.src,
      alt: props.ctx.widget.options.alt,
      href: props.ctx.widget.options.href
    }))

    const listeners = { ...context.$listeners }

    return { uid, i, attrs, style, displayProps, optionsProps, listeners }
  }
}
</script>

<style scoped>
.u-webcontent {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
