import { ref } from '@vue/composition-api'
import { useWidget, useWot } from './index.js'
import { ajv } from '../utils/index.js'

// IMPORTANT: destructure only static values (avoid loosing reactivity)

/* REFERENCE:
const {
  op,
  href,
  contentType,
  contentCoding,
  subprotocol,
  security,
  scopes,
  response,
  additionalResponses,
  type
} = form
*/

export function useWotForm(ctx, defaultValue, mode = 'latest-value') {
  const form = ctx.wot || {}

  const { uid, i, _id, $console, topic } = useWidget(ctx)

  // wot:

  // TODO: add optional-chaining support (tried adding babel/webpack but everything failed for app on cloudflare build)
  const thing = 'getThing' in form ? form.getThing() : null
  const name = 'getName' in form ? form.getName() : ''
  const { options } = form

  const { contentType, getValue } = useWot(ctx)

  // wot-form:

  const validateInput = ajv.compile(form)

  const isValidInput = (input) => validateInput(input)

  const value = ref({}) // {InteractionInput} - value of readproperty and for writeproperty

  const readAllProperties = async () => {
    value.value = await thing.readAllProperties(options) // returns Promise<PropertyReadMap>
  }

  const readMultipleProperties = async (propertyNames) => {
    value.value = await thing.readMultipleProperties(propertyNames, options) // returns Promise<PropertyReadMap>
  }

  // NOTE: writeAllProperties() under discussion, use writeMultipleProperties()
  // see https://w3c.github.io/wot-scripting-api/#the-consumedthing-interface
  // const writeAllProperties = async (valueMap) => {
  //   value.value = await thing.writeAllProperties(valueMap, options) // returns Promise<void>
  // }

  const writeMultipleProperties = async (valueMap) => {
    value.value = await thing.writeMultipleProperties(valueMap, options) // returns Promise<void>
  }

  return {
    form,
    // wot:
    thing,
    name,
    options,
    // wot-form:
    isValidInput,
    value,
    readAllProperties,
    readMultipleProperties,
    // writeAllProperties,
    writeMultipleProperties
  }
}
