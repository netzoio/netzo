import { Netzo } from '../src'

describe('Netzo', () => {
  test('Netzo', async () => {
    expect(Netzo).toBeTruthy()
  })
})

describe('Netzo.api', () => {
  test('Netzo.api.getApiUrl()', async () => {
    const api = await Netzo.api()
    expect(api.getApiUrl).toBeTruthy()
  })
  test('Netzo.api.getToken()', async () => {
    const api = await Netzo.api()
    expect(api.getToken).toBeTruthy()
  })
})

describe('Netzo.api', () => {
  test('Netzo.console()', async () => {
    expect(Netzo.console).toBeTruthy()
    expect(Netzo.console.debug).toBeTruthy()
    expect(Netzo.console.log).toBeTruthy()
    expect(Netzo.console.info).toBeTruthy()
    expect(Netzo.console.warn).toBeTruthy()
    expect(Netzo.console.error).toBeTruthy()
  })
})

describe('Netzo.wot', () => {
  test('Netzo.wot.fetchTD()', async () => {
    const wot = await Netzo.wot()
    expect(wot.fetchTD).toBeTruthy()
  })
  test('Netzo.wot.consumeThing()', async () => {
    const wot = await Netzo.wot()
    expect(wot.consumeThing).toBeTruthy()
  })
  test('Netzo.wot { srv, ...__proto__ }', async () => {
    const wot = await Netzo.wot()
    expect(wot).toBeTruthy()
  })
})
