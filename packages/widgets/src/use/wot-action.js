import { ref, computed } from '@vue/composition-api'
import { useWidget, useWot } from './index.js'
import { ajv, isStrictFalsey, isObjectEmpty } from '../utils/index.js'

// IMPORTANT: destructure only static values (avoid loosing reactivity)

/* REFERENCE:
const { input: DataSchema, output: DataSchema, safe, idempotent } = action

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

export function useWotAction(ctx, defaultValue, mode = 'latest-value') {
  const action = ctx.wot || {}

  const { uid, i, _id, $console, topic } = useWidget(ctx)

  // wot:

  // TODO: add optional-chaining support (tried adding babel/webpack but everything failed for app on cloudflare build)
  const thing = 'getThing' in action ? action.getThing() : null
  const name = 'getName' in action ? action.getName() : ''
  const {
    input: inputSchema = {},
    output: outputSchema = {},
    options // InteractionOptions: { formIndex?: number, uriVariables?: object, data?: any }
  } = action

  const { contentType, getValue } = useWot(ctx)

  // wot-action:

  const validateInput = ajv.compile(inputSchema)
  const isValidInput = (input) =>
    isStrictFalsey(inputSchema) && validateInput(input)

  const validateOutput = ajv.compile(outputSchema)
  const isValidOutput = (output) =>
    isStrictFalsey(outputSchema) && !validateOutput(output)

  const input = ref({}) // {InteractionInput} - input for invokeaction
  const output = ref({}) // {undefined | InteractionOutput} - output from invokeaction

  const invokeAction = async (name, input, options) => {
    try {
      isSubmittingForm.value = true
      const output = await thing.invokeAction(name, input, options)
      $console.info(`${topic} invokeaction ${name} with input ${input}`, {
        name,
        input,
        options,
        output
      })
      console.log({ name, input, options, output })
      return output
    } catch (error) {
      $console.error(error)
    } finally {
      isSubmittingForm.value = false
    }
  }

  // TODO: cancelAction, queryAction, queryActionInstance, ...

  const dialog = ref(false)

  const dialogReject = (event) => {
    dialog.value = false
  }

  const dialogResolve = async (event) => {
    try {
      isSubmittingForm.value = true
      output.value = await invokeAction(name, input.value, options)
      dialog.value = false // only close if invokeAction does not throw error
    } catch (error) {
      // do nothing (error logged already by invokeAction)
    }
  }

  const isValidForm = ref(false)

  const isSubmittingForm = ref(false)

  const vjsfOptions = ref({})

  return {
    action,
    // wot:
    thing,
    name,
    inputSchema,
    outputSchema,
    options,
    // validation:
    isValidInput,
    isValidOutput,
    // wot-action:
    input,
    output,
    invokeAction,
    dialog,
    dialogReject,
    dialogResolve,
    isValidForm,
    isSubmittingForm,
    vjsfOptions
  }
}
