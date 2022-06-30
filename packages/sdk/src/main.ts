import { api, console, wot } from './modules'

/**
 * Internal usage: things from Netzo API
 *
 * const netzo = Netzo({...})
 * const thing = netzo.wot.consumeThing(_id)
 * console.log(await thing.readProperty('temp'))
 *
 * const td = netzo.wot.fetchTD(_id)
 * const thing = await netzo.wot.consume(td)
 * console.log(await thing.readProperty('temp'))
 *
 * External usage: things from any hosted TD
 *
 * const netzo = Netzo({...})
 * const td = await fetchTD(url)
 * const thing = await netzo.wot.consume(td)
 * console.log(await thing.readProperty('temp'))
 */

export const Netzo: Netzo = { api, console, wot }
