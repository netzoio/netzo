<template>
  <div class="p-grid">
    <template v-if="dimensions === 1">
      <div class="p-grid-y">
        <button
          v-for="(x, i) in value"
          :key="`p-grid-cell-${uid}-${i}`"
          :disabled="typeof value[i] !== 'boolean' || readOnly"
          class="p-grid-cell"
          :style="{
            ...style,
            ...getCellStyle(value[i]),
            'flex-direction': 'row'
          }"
          v-bind="{ ...attrs, ...displayProps }"
          @click="$set(value, i, !value[i])"
        >
          <div
            v-if="displayProps.showValues"
            :contenteditable="typeof value[i] !== 'boolean' && !readOnly"
            @blur="$set(value, i, Number($event.target.innerText))"
            @keydown.enter="$event.target.blur()"
            class="pa-1"
          >
            {{ value[i] }}
          </div>
        </button>
      </div>
    </template>

    <template v-else-if="dimensions === 2">
      <div
        v-for="(y, j) in value"
        :key="`p-grid-y-${uid}-${j}`"
        class="p-grid-y"
        :style="`height: calc(100% / ${y.length});`"
      >
        <button
          v-for="(x, i) in value[j]"
          :key="`p-grid-cell-${uid}-${j}-${i}`"
          :disabled="typeof value[j][i] !== 'boolean' || readOnly"
          class="p-grid-cell"
          :style="{ ...style, ...getCellStyle(value[j][i]) }"
          v-bind="{ ...attrs, ...displayProps }"
          v-on="listeners"
          @click="$set(value[j], i, !value[j][i])"
        >
          <div
            v-if="displayProps.showValues"
            :contenteditable="typeof value[j][i] !== 'boolean' && !readOnly"
            @blur="$set(value[j], i, Number($event.target.innerText))"
            @keydown.enter="$event.target.blur()"
            class="pa-1"
          >
            {{ value[j][i] }}
          </div>
        </button>
      </div>
    </template>

    <template v-else-if="dimensions === 3">
      <div class="fill-height">
        <v-toolbar dense flat>
          <v-tabs v-model="activeZ" x-small grow>
            <v-tab v-for="(z, k) in value" :key="`p-grid-z-tab-${uid}-${k}`">
              {{ k }}
            </v-tab>
          </v-tabs>
        </v-toolbar>

        <v-tabs-items v-model="activeZ">
          <v-tab-item
            v-for="(z, k) in value"
            :key="`p-grid-z-${uid}-${k}`"
            :style="`height: calc(100% / ${z.length});`"
          >
            <div
              v-for="(y, j) in value[k]"
              :key="`p-grid-y-${uid}-${k}-${j}`"
              class="p-grid-y fill-height"
            >
              <button
                v-for="(x, i) in value[k][j]"
                :key="`p-grid-cell-${uid}-${k}-${j}-${i}`"
                :disabled="typeof value[k][j][i] !== 'boolean' || readOnly"
                class="p-grid-cell"
                v-bind="{ ...attrs, ...displayProps }"
                :style="{ ...style, ...getCellStyle(value[k][j][i]) }"
                v-on="listeners"
                @click="$set(value[k][j], i, !value[k][j][i])"
              >
                <div
                  v-if="displayProps.showValues"
                  :contenteditable="
                    typeof value[k][j][i] !== 'boolean' && !readOnly
                  "
                  @blur="$set(value[k][j], i, Number($event.target.innerText))"
                  @keydown.enter="$event.target.blur()"
                  class="pa-1"
                >
                  {{ value[k][j][i] }}
                </div>
              </button>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useWidget, useWotProperty } from '../../use'
import { percentToHexColor, getPercentageInRange } from '../../utils/index.js'

export default {
  name: 'PGrid',
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
      // value,
      readProperty,
      writeProperty,
      observeProperty
    } = useWotProperty(props.ctx)

    const { readOnly = false, minimum = 0, maximum = 100 } = property

    // TODO: REMOVE AND UNCOMMENT VALUE REF FROM ABOVE USEWOTPROPERTY()
    const value = ref([
      [0, 50, 99, 100],
      [true, 24, false, true],
      [false, 76, 34, 2000],
      [40, false, true, 1]
    ])

    const dimensions = value.value[0]?.[0]?.length
      ? 3
      : value.value[0]?.length
      ? 2
      : value.value?.length
      ? 1
      : 0

    const activeZ = ref(0) // used as model for tabs

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
      label: props.ctx.widget.display.label,
      colorTrueOrMax: props.ctx.widget.display.colorTrueOrMax || '#44C47D',
      colorFalseOrMin: props.ctx.widget.display.colorFalseOrMin || '#d73a49',
      showValues: props.ctx.widget.display.showValues
    }))

    const listeners = { ...context.$listeners }

    watch(value, (value) => writeProperty(value), { deep: true })

    function getCellStyle(value) {
      if (typeof value === 'boolean') {
        return {
          'background-color': value
            ? displayProps.value.colorTrueOrMax
            : displayProps.value.colorFalseOrMin
        }
      } else if (
        typeof value === 'number' &&
        typeof minimum !== 'undefined' &&
        typeof Number(minimum) === 'number' &&
        typeof maximum !== 'undefined' &&
        typeof Number(maximum) === 'number'
      ) {
        const [min, max] = [Number(minimum), Number(maximum)] // cast in case of string
        // normalize off-range values (e.g. 20 goes to 1.0) and offset by 0.01 to avoid 0% if 0
        const percentage =
          value <= min
            ? 0.0
            : value >= max
            ? 1.0
            : getPercentageInRange(value, min, max) // between 0.0 and 1.0

        const getColor = (hex) => [
          parseInt(hex.slice(1, 3), 16), // R
          parseInt(hex.slice(3, 5), 16), // G
          parseInt(hex.slice(5, 7), 16), // B
          parseInt(hex.slice(7, 9) || 'ff', 16) // A (opacity with default: 255)
        ]

        const colorMin = getColor(displayProps.value.colorFalseOrMin)
        const colorMax = getColor(displayProps.value.colorTrueOrMax)

        const bgColor =
          percentToHexColor(percentage, colorMin, colorMax) ?? 'transparent'

        return { 'background-color': bgColor }
      }
    }

    return {
      minimum,
      maximum,
      uid,
      readOnly,
      value,
      dimensions,
      activeZ,
      attrs,
      style,
      displayProps,
      listeners,
      getCellStyle
    }
  }
}
</script>

<style scoped>
.p-grid {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: 100% 100%;
}

.v-tabs-items {
  width: 100%;
  height: calc(100% - 48px);
}

>>> .v-window__container {
  height: 100% !important;
}

/* >>> .v-window-item  */

/* .v-window-item {
  width: 100%;
  height: calc(100% - 32px - 48px);
} */

.p-grid-y {
  display: flex;
  width: 100%;
  height: 100%;
  justify-items: space-between;
}

.p-grid-cell {
  width: 100%;
  /* height: calc(100% - 2px); */
  margin: 1px;
  display: grid;
  place-items: center;
}
</style>
