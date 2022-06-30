import { jsonParse } from '../utils/index.js'
import jsonata from 'jsonata'

// IMPORTANT: destructure only static values (avoid loosing reactivity)

export function useWot(ctx) {
  // TODO: add optional-chaining support (tried adding babel but everything failed on cloudflare build)
  const contentType =
    (ctx.wot &&
      ctx.wot.forms &&
      ctx.wot.forms[0] &&
      ctx.wot.forms[0].contentType) ||
    'application/json'

  function getValue(value) {
    value = jsonParse(value) // TODO: use node-wot's  .value() method
    // console.info(ctx, value)

    // transformation:
    const { type, value: query } = ctx.wot.options.transformation || {}
    if (type === 'jsonata') {
      try {
        return !query ? value : jsonata(query).evaluate(value)
      } catch (error) {
        return error.message
      }
    }

    // contentType:
    else if (contentType.includes('image/')) {
      // encode images as base64 encoded strings
      return window.btoa(value)
    }

    return value // default
  }

  return { contentType, getValue }
}
