// cannot use 'import' in global type declaration file
// see https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript

// TODO: NetzoOptionscould allow single initialization e.g.
// const netzo = await Netzo.init(options: NetzoOptions)
// const thing = netzo.wot.consumeThing(THING_ID) // wot() invoked by async init()
// const dashboards = netzo.api.service('dashboards') // api() invoked by async init()
// interface NetzoOptions {
//   token?: string
//   api?: NetzoOptionsApi
//   console?: NetzoOptionsConsole
//   wot?: NetzoOptionsWot
// }

interface NetzoOptionsApi {
  [k: string]: unknown
}

interface NetzoOptionsConsole {
  loglevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error'
}

interface NetzoOptionsWot {
  http?: unknown
  ws?: unknown
}

type NetzoApi = (NetzoOptionsApi?) => Promise<{
  getApiUrl: () => string
  getToken: () => string | null
}>

type NetzoWot = (NetzoOptionsWot?) => Promise<{
  fetchTD: (string) => Promise<WoT.ThingDescription>
  consumeThing: (string) => Promise<WoT.ConsumedThing>
  [k: string]: unknown // ...servient.__proto__
}>

interface Netzo {
  api: NetzoApi
  console: Console
  wot: NetzoWot
}
