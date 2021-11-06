import Ajv from 'ajv'
export const ajv = new Ajv()

export function jsonParse(data) {
  try {
    return JSON.parse(data, null, 2)
  } catch {
    return data
  }
}

export function jsonStringify(data) {
  return typeof data === 'string' ? data : JSON.stringify(data, null, 2)
}

export function isObjectEmpty(value) {
  return (
    Object.prototype.toString.call(value) === '[object Object]' &&
    JSON.stringify(value) === '{}'
  )
}

export function isValidJsonString(str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export function isValidJsonObject(obj) {
  obj = typeof obj !== 'string' ? JSON.stringify(obj) : obj
  try {
    obj = JSON.parse(obj)
  } catch (e) {
    return false
  }
  if (typeof obj === 'object' && obj !== null) {
    return true
  }
  return false
}

export const sort = (values, keys) =>
  // sorts a map of key values according to array of keys (strings)
  keys.reduce((acc, key) => ({ ...acc, [key]: values[key] }), {})

export const isStrictFalsey = (value) =>
  !value ||
  isObjectEmpty(value) ||
  value === [] ||
  value.length === 0 ||
  value == null ||
  value == undefined

export function goToExternal(path, openInNewTab = true) {
  // opens external url in new tab
  if (openInNewTab) window.open(path, '_blank')
  else window.open(path)
}

export function isError(e) {
  return e && e.stack && e.message
}

export function log(message, color) {
  switch (color) {
    case 'success':
      color = 'Green'
      break
    case 'info':
      color = 'DodgerBlue'
      break
    case 'error':
      color = 'Red'
      break
    case 'warn':
      color = 'Orange'
      break
    default:
      color = color || 'black'
  }
  console.debug('%c' + message, 'color:' + color)
}

export function debounce(callback, delay = 250) {
  let timeoutId
  console.debug(callback)
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      console.debug(timeoutId)
      timeoutId = null
      callback(...args)
    }, delay)
  }
}

export function navErrorHandler(error) {
  // Ignore the vuex err regarding  navigating to the page they are already on.
  if (error.name !== 'NavigationDuplicated') console.error(error)
}

export function createQrCode(url, name = null) {
  // creates qr code from url and (optional) name with barcodes API service
  const query = name ? `url=${url}&name=${name}` : `url=${url}`
  window.open(`${process.env.VUE_APP_API_URL}/barcodes?${query}`)
}

export function filterObjectByKeys(keys, object) {
  return { ...keys.map((key) => ({ [key]: object[key] })) }
}

// Interpolates between two colors, maps percentage to a value between both and returns HSL string
export function percentToHSLColor(percent, startDegree, endDegree) {
  // Maps a percent value to a color and returns a valid hsl string
  // Change the startDegree and endDegree values to reflect the hue map
  // Reference : http://www.ncl.ucar.edu/Applications/Images/colormap_6_3_lg.png

  /* Degree Reference (around hue colormap wheel):
      0 – red
      60 – yellow
      120 – green
      180 – turquoise
      240 – blue
      300 – pink
      360 – red
  */

  var a = (100 - percent) / 100,
    b = (endDegree - startDegree) * a,
    c = b + startDegree

  // Return a CSS HSL string
  return 'hsl(' + c + ', 100%, 50%)'
}

// Interpolates between two RGB colors (in array format e.g. [255, 0, 0]),
// maps percentage to a value between both and returns HEX string
export function percentToHexColor(p, [r1, g1, b1], [r2, g2, b2]) {
  const rr = Math.round(r2 * p + r1 * (1 - p))
  const rg = Math.round(g2 * p + g1 * (1 - p))
  const rb = Math.round(b2 * p + b1 * (1 - p))
  const opacity = 'FF'

  const hex = Number((rr << 16) + (rg << 8) + rb).toString(16)

  return `#${hex}${opacity}`
}

export function getPercentageInRange(val, min = 0, max = 100) {
  return (val - min) / (max - min)
}

export function toKebab(string) {
  return string
    .split('')
    .map((letter, index) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`
      }
      return letter
    })
    .join('')
    .trim()
    .replace(/[_\s]+/g, '-')
}

export function toCamel(string) {
  return toKebab(string)
    .split('-')
    .map((word, index) => {
      if (index === 0) return word
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

export function toTitle(string) {
  return toKebab(string)
    .split('-')
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export function toSentence(string) {
  const interim = toKebab(string).replace(/-/g, ' ')
  return interim.slice(0, 1).toUpperCase() + interim.slice(1)
}

export function camelToKebabCase(string) {
  // e.g. HTMLInputElement --> html-input-element
  return string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase()
}

export function getIntersection(array1, array2) {
  return array1.filter((value) => array2.includes(value))
}

// array operations:

export const intersection = (arrayA, arrayB) =>
  arrayA.filter((x) => arrayB.includes(x))

export const difference = (arrayA, arrayB) =>
  arrayA.filter((x) => !arrayB.includes(x))

export const symetricalDifference = (arrayA, arrayB) =>
  arrayA
    .filter((x) => !arrayB.includes(x))
    .concat(arrayB.filter((x) => !arrayA.includes(x)))

export const union = (arrayA, arrayB) => [...arrayA, ...arrayB]

export const unionSet = (arrayA, arrayB) => [...new Set([...arrayA, ...arrayB])]

// links and images (see https://www.iana.org/assignments/link-relations/link-relations.xhtml)

export const getLinkByRel = (rel, links = []) =>
  links.find((link) => link.rel === rel)

export const getLinksByRel = (rel, links = []) =>
  links.filter((link) => link.rel === rel)

export const getImageByRel = (rel, links = []) => {
  const image = links.find((link) => link.rel === rel)
  if (!image) return ''
  return image.href.startsWith('http') ? image.href : require(image.href)
}

export const getImagesByRel = (rel, links = []) => {
  const images = links.filter((link) => link.rel === rel)
  if (!images.length) return []
  return images.map((image) =>
    image.href.startsWith('http') ? image.href : require(image.href)
  )
}
