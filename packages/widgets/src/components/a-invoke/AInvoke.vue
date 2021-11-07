<template>
  <div class="a-invoke" :style="style">
    <v-dialog v-model="dialog" width="500" :disabled="inputSchema === {}">
      <template #activator="{ attrs, on }">
        <v-btn
          v-bind="{ ...attrs, ...displayProps }"
          v-on="{ ...on, ...listeners }"
          @keydown.esc="dialogReject"
          @keydown.enter="dialogResolve"
        >
          {{ displayProps.label }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ displayProps.label }}
        </v-card-title>

        <v-card-text>
          <v-card-subtitle
            v-if="displayProps.description"
            class="mb-6 text-center text--secondary"
          >
            {{ displayProps.description }}
          </v-card-subtitle>

          <v-form ref="form" v-model="isValidForm" lazy-validation>
            <vjs-form
              v-model="input"
              :schema="inputSchema"
              :options="vjsfOptions"
            />
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            :disabled="!isValidForm"
            :loading="isSubmittingForm"
            @click="dialogResolve"
          >
            Invoke
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useWidget, useWotAction } from '../../use'

export default {
  name: 'AInvoke',
  props: {
    ctx: { type: Object, required: true }
  },
  emits: [],
  setup(props, context) {
    const { uid, i, _id, $console, topic } = useWidget(props.ctx)

    const {
      action,
      // wot:
      thing,
      name,
      inputSchema,
      outputSchema,
      options,
      // wot-action:
      isValidInput,
      isValidOutput,
      input,
      output,
      invokeAction,
      dialog,
      dialogReject,
      dialogResolve,
      isValidForm,
      isSubmittingForm,
      vjsfOptions
    } = useWotAction(props.ctx)

    // local:

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
      color: props.ctx.widget.display.color
    }))

    const listeners = { ...context.$listeners }

    return {
      inputSchema,
      outputSchema,
      // wot-action:
      input,
      output,
      invokeAction,
      dialog,
      dialogReject,
      dialogResolve,
      isValidForm,
      isSubmittingForm,
      vjsfOptions,
      // local:
      attrs,
      style,
      displayProps,
      listeners
    }
  }
}
</script>

<style scoped>
.a-invoke {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-size: 100% 100%;
}
</style>
