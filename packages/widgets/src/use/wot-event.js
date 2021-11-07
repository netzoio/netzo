import { ref, computed, watch, onUnmounted } from '@vue/composition-api'
import { useWidget, useWot } from './index.js'
import { ajv, isStrictFalsey } from '../utils/index.js'

// IMPORTANT: destructure only static values (avoid loosing reactivity)

/* REFERENCE:
const { subscription: DataSchema, data: DataSchema, cancellation: DataSchema } = event

interface DataSchema {
  const: constValue,
  default: defaultValue,
  unit,
  oneOf,
  enum: enumValue,
  readOnly,
  writeOnly,
  format,
  type,
  // if ArraySchema:
  items,
  minItems,
  maxItems,
  // if BooleanSchema:
  // if NumberSchema or IntegerSchema:
  minimum,
  maximum,
  exclusiveMinimum,
  exclusiveMaximum,
  multipleOf,
  // if ObjectSchema,
  properties,
  required,
  // if StringSchema,
  minLength,
  maxLength,
  pattern,
  contentEncoding,
  contentMediaType
  // if NullSchema:
}
*/

export function useWotEvent(ctx, defaultValue, mode = 'latest-value') {
  const event = ctx.wot || {}

  const { uid, i, _id, $console, topic } = useWidget(ctx)

  // wot:

  // TODO: add optional-chaining support (tried adding babel/webpack but everything failed for app on cloudflare build)
  const thing = 'getThing' in event ? event.getThing() : null
  const name = 'getName' in event ? event.getName() : ''
  const {
    subscription: subscriptionSchema = {},
    data: dataSchema = {},
    cancellation: cancellationSchema = {},
    wotListener = async (data) => {
      try {
        ctx.setLoading(true)
        if (mode === 'latest-value') {
          value.value = getValue(data)
        } else if (mode === 'time-series') {
          value.value.push(getValue(data))
        }
        $console.info(`${topic} readproperty: ${value.value}`)
      } catch (error) {
        $console.error(error)
      } finally {
        ctx.setLoading(false)
      }
    },
    options // InteractionOptions: { formIndex?: number, uriVariables?: object, data?: any }
  } = event

  // validation:

  const validateSubscription = ajv.compile(subscriptionSchema)
  const isValidSubscription = (input) => !validateSubscription(input)

  const validateData = ajv.compile(dataSchema)
  const isValidData = (input) => !validateData(input)

  const validateCancellation = ajv.compile(cancellationSchema)
  const isValidCancellation = (input) => !validateCancellation(input)

  const { contentType, getValue } = useWot(ctx)

  // wot-event:

  const value = ref([]) // {InteractionInput} - data for subscribeevent

  const subscribeEvent = async (name, wotListener, options) => {
    thing && (await thing.subscribeEvent(name, wotListener, options))
  }

  const unsubscribeEvent = async (name) => thing && thing.unsubscribeEvent(name)

  // lifecycle:

  subscribeEvent(name, wotListener, options)
  onUnmounted(() => unsubscribeEvent(name))

  return {
    event,
    // wot:
    thing,
    name,
    subscriptionSchema,
    dataSchema,
    cancellationSchema,
    options,
    // validation:
    isValidSubscription,
    isValidData,
    isValidCancellation,
    // wot-event:
    value,
    subscribeEvent,
    unsubscribeEvent
  }
}
