<template>
  <div class="u-image" :style="style">
    <a :href="optionsProps.href" target="_blank">
      <img
        :src="optionsProps.imageUrl"
        :alt="optionsProps.alt"
        :style="styleImg"
      />
    </a>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'UImage',
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

    const styleImg = computed(() => ({
      padding: props.ctx.widget.display.imagePadding || '8px',
      'object-fit': props.ctx.widget.display.imageObjectFit || 'contain'
    }))

    const displayProps = computed(() => ({
      ...context.$props
    }))

    const optionsProps = computed(() => ({
      imageUrl: props.ctx.widget.options.imageUrl,
      alt: props.ctx.widget.options.alt,
      href: props.ctx.widget.options.href
    }))

    const listeners = { ...context.$listeners }

    return {
      value,
      attrs,
      style,
      styleImg,
      displayProps,
      optionsProps,
      listeners
    }
  }
}
</script>

<style scoped>
.u-image {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

a,
img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
