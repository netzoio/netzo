<template>
  <div class="p-joystick" :style="style">
    <div
      ref="pJoystick"
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
    />
  </div>
</template>

<script>
import nipplejs from 'nipplejs'
import { ref, computed, watch, onMounted } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PJoystick',
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
    } = useWotProperty(props.ctx, [0, 0])

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

    // joystick:

    const joystickOptions = {
      color: props.ctx.widget.display.color,
      ...props.ctx.widget.options
    }

    onMounted(() => {
      $console.log('[wc/p-joystick]', joystickOptions)
      const zone = context.refs.pJoystick // document.querySelector(`#${props.ctx.widget.i} .p-joystick`) // {HTMLElement} active zone
      const manager = nipplejs.create({ zone, ...joystickOptions })
      setEventListeners(manager)
      $console.log('[wc/p-joystick]', manager)
    })

    function setEventListeners(manager) {
      // NOTE: listen to multiple events at once by separating by space or comma

      // manager only events
      manager.on('added, removed', (evt, data) => {
        $console.log('[wc/p-joystick]', evt, data)
      })

      // manager and joystick events (available at both the manager and joysticks)
      manager.on(
        'start, end, move, dir, plain, shown, hidden, destroyed, pressure',
        (evt, data) => {
          $console.log('[wc/p-joystick]', evt, data)
        }
      )
    }

    return { attrs, style, displayProps, listeners }
  }
}
</script>

<style scoped>
.p-joystick {
  width: 100%;
  height: 100%;
}
</style>
