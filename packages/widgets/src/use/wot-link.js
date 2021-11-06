import { ref } from '@vue/composition-api'
import { useWidget, useWot } from './index.js'

// IMPORTANT: destructure only static values (avoid loosing reactivity)

/* REFERENCE:
const { href, type, rel, anchor, sizes } = link
*/

export function useWotLink(ctx, defaultValue, mode = 'latest-value') {
  const link = ctx.wot || {}

  const { uid, i, _id, $console, topic } = useWidget(ctx)

  // wot:

  // TODO: add optional-chaining support (tried adding babel/webpack but everything failed for app on cloudflare build)
  const thing = 'getThing' in link ? link.getThing() : null
  const name = 'getThing' in link ? link.getName() : ''
  const { options } = link

  const { contentType, getValue } = useWot(ctx)

  // wot-link:

  return {
    link,
    // wot:
    thing,
    name,
    options,
    // wot-link:
    // widget:
    uid,
    i,
    _id,
    $console,
    topic,
    contentType,
    getValue
  }
}
