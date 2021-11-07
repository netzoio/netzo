<template>
  <div class="p-table" :style="style">
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
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'

export default {
  name: 'PTable',
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
      value: latestValue,
      readProperty,
      writeProperty,
      observeProperty
    } = useWotProperty(props.ctx, [])

    const value = ref([])
    watch(
      latestValue,
      (latestValue) => (value.value = [...value.value, latestValue]),
      { deep: true, immediate: true }
    )

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
.p-table {
  width: 100%;
  height: 100%;
}

.v-data-table {
  background-color: transparent !important;
}
</style>
