import { ref, watch, onUnmounted } from '@vue/composition-api'
import { useWidget, useWot } from './index.js'
import { ajv } from '../utils/index.js'

// IMPORTANT: destructure only static values (avoid loosing reactivity)

/* REFERENCE:
const {
  observable,
  ...dataSchema: DataSchema
} = property

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

NOTE: open issue of undefined behavior for readOnly/writeOnly
see https://github.com/w3c/wot-thing-description/issues/1005
see https://github.com/eclipse/thingweb.node-wot/issues/326
see
| default property 'op' |  readOnly: true  |          readOnly: false          |
|:---------------------:|:----------------:|:---------------------------------:|
|    writeOnly: true    | ['readproperty'] |         ['writeproperty']         |
|    writeOnly: false   | ['readproperty'] | ['readproperty', 'writeproperty'] |
*/

const getDefaultValue = ({ type }) =>
  type === 'object'
    ? {}
    : type === 'array'
    ? []
    : type === 'number' || type === 'integer'
    ? 0
    : type === 'string'
    ? ''
    : type === 'boolean'
    ? false
    : type === 'null'
    ? null
    : null

export function useWotProperty(ctx, defaultValue, mode = 'latest-value') {
  const property = ctx.wot || {}

  const { uid, i, _id, $console, topic } = useWidget(ctx)

  // wot:

  // TODO: add optional-chaining support (tried adding babel/webpack but everything failed for app on cloudflare build)
  const thing = 'getThing' in property ? property.getThing() : {}
  const name = 'getThing' in property ? property.getName() : ''
  const {
    wotListener = async (data) => {
      try {
        ctx.setLoading(true)
        if (mode === 'latest-value') {
          value.value = getValue(data)
          $console.info(
            `${topic} observeproperty handler (latest-value) ${value.value}`
          )
        } else if (mode === 'time-series') {
          value.value.push(getValue(data))
          $console.info(
            `${topic} observeproperty handler (time-series) ${value.value}`
          )
        }
      } catch (error) {
        $console.error(error)
      } finally {
        ctx.setLoading(false)
      }
    },
    options // InteractionOptions: { formIndex?: number, uriVariables?: object, data?: any }
  } = property

  const { contentType, getValue } = useWot(ctx)

  // wot-property:

  const validateInput = ajv.compile(property)

  const isValidInput = (input) => validateInput(input)

  const value = ref(defaultValue || getDefaultValue(property)) // {InteractionInput} - value of readproperty and for writeproperty

  const readProperty = async () => {
    try {
      ctx.setLoading(true)
      const val = await thing.readProperty(name, options, {})
      value.value = getValue(val)
      $console.info(`${topic} readproperty ${name} and set to ${val}`)
      return value.value
    } catch (error) {
      $console.error(error)
      return value.value
    } finally {
      ctx.setLoading(false)
    }
  }

  /**
   * Utilty function for 'writeproperty' operation, handles local to remote sync
   * and auto-updates 'value' state. Returns a promise resolving to the local state
   *
   * @param {any} val
   * @returns {Promise<val>}
   */
  const writeProperty = async (val) => {
    if (!thing.readOnly) {
      val =
        property.type === 'integer' || property.type === 'number'
          ? Number(val)
          : property.type === 'boolean'
          ? Boolean(val)
          : property.type === 'string'
          ? String(val)
          : val // force type casting
      value.value = val // set locally
      try {
        ctx.setLoading(true)
        await thing.writeProperty(name, val, {}) // try remote write
        $console.info(`${topic} writeproperty ${name} to ${val}`)
        return value.value
      } catch (error) {
        $console.error(error)
        value.value = !val // revert locally if fails
        return value.value
      } finally {
        ctx.setLoading(false)
      }
    } else {
      $console.warn(`${topic} cannot write readOnly property '${name}'`)
    }
  }

  const observeProperty = async (name, wotListener, options) => {
    await thing.observeProperty(name, wotListener, options)
    $console.info(`${topic} observeproperty ${name}`)
  }

  const unobserveProperty = async (name) => {
    thing.unobserveProperty(name)
    $console.info(`${topic} unobserveproperty ${name}`)
  }

  // lifecycle:

  readProperty()

  observeProperty(name, wotListener, options)

  onUnmounted(() => unobserveProperty(name))

  return {
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
    observeProperty,
    unobserveProperty
  }
}
