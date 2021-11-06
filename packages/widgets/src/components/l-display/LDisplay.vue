<template>
  <div class="l-display" :style="style">
    <template v-if="link.rel === 'icon'">
      <a :href="link.href" target="_blank">
        <img
          :src="link.href"
          :alt="link.rel"
          :sizes="link.sizes"
          :style="styleImg"
        />
      </a>
    </template>
    <template v-else-if="link.type === 'application/json'">
      {{ JSON.stringify(link, null, 2) }}
    </template>
    <template v-else>
      {{ link }}
    </template>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useWidget, useWotLink } from '../../use'

export default {
  name: 'LDisplay',
  props: {
    ctx: { type: Object, required: true }
  },
  emits: [],
  setup(props, context) {
    const { uid, i, _id, $console, topic } = useWidget(props.ctx)

    const {
      link,
      // wot:
      thing,
      name,
      options
      // wot-link:
    } = useWotLink(props.ctx)

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
      link,
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
.l-display {
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
