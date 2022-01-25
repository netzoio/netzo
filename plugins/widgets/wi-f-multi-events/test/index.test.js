const Ajv = require('ajv')
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const { form } = require('../plugin.json')
const { wot: wotSchema } = form.schema.properties

describe(`[${form.model.uid}] examples in wotSchema validate against wotSchema`, () => {
  it(`should validate wotSchema.examples to wotSchema (json schema)`, () => {
    wotSchema.examples.forEach((example) => {
      const valid = ajv.validate(wotSchema, example)
      const errorMessage = (ajv.errors || [])
        .map((error) => {
          try {
            const [, index, fieldName] = /\[(.*)\].(.*)/.exec(error.dataPath)
            return `error with item #${index}'s field "${fieldName}". The error is: ${error.message}`
          } catch (error) {
            return error.message
          }
        })
        .join('\n')
      expect(valid).toBeTruthy()
    })
  })
})
