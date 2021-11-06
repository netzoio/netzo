<template>
  <div class="u-webcontent" :style="style">
    <iframe
      v-if="optionsProps.src"
      :src="optionsProps.src"
      :title="optionsProps.title"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
      seamless
    />
    <iframe
      v-else-if="optionsProps.srcdoc"
      :srcdoc="optionsProps.srcdoc"
      :title="optionsProps.title"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
      seamless
    />
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'UWebcontent',
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
      ...context.$props
    }))

    const optionsProps = computed(() => ({
      src: props.ctx.widget.options.src,
      alt: props.ctx.widget.options.alt,
      href: props.ctx.widget.options.href
    }))

    const listeners = { ...context.$listeners }

    return { value, attrs, style, displayProps, optionsProps, listeners }
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
