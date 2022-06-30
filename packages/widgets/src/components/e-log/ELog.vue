<template>
  <div class="e-log" :style="style">
    <v-data-table
      :headers="headers"
      :items="value"
      disable-pagination
      v-bind="{ ...attrs, ...displayProps }"
      v-on="listeners"
    ></v-data-table>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useWidget, useWotEvent } from '../../use'

export default {
  name: 'ELog',
  props: {
    ctx: { type: Object, required: true }
  },
  emits: [],
  setup(props, context) {
    const { uid, i, _id, $console, topic } = useWidget(props.ctx)

    const {
      event,
      // wot:
      thing,
      name,
      subscriptionSchema,
      dataSchema,
      cancellation,
      options,
      // validation:
      isValidSubscription,
      isValidData,
      isValidCancellation,
      // wot-event:
      value,
      subscribeEvent,
      unsubscribeEvent
    } = useWotEvent(props.ctx)

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
      dense: true,
      color: props.ctx.widget.display.color
    }))

    const listeners = { ...context.$listeners }

    // table:

    const headers = computed(() => {
      const cols = props.ctx.widget?.display?.cols?.length
        ? props.ctx.widget.display.cols
        : value.value?.[0]
        ? Object.keys(value.value[0])
        : []
      return cols.map((col) => ({
        text: col,
        value: col
        // align?: 'start' | 'center' | 'end',
        // sortable?: boolean,
        // filterable?: boolean,
        // groupable?: boolean,
        // divider?: boolean,
        // class?: string | string[],
        // cellClass?: string | string[],
        // width?: string | number,
        // filter?: (value: any, search: string, item: any) => boolean,
        // sort?: (a: any, b: any) => number
      }))
    })

    return {
      value,
      displayProps,
      attrs,
      style,
      listeners,
      //table:
      headers
    }
  }
}
</script>

<style scoped>
.e-log {
  width: 100%;
  height: 100%;
}

.v-data-table {
  background-color: transparent !important;
}
</style>
