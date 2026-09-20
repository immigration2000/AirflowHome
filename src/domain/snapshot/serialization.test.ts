import { describe, expect, it } from 'vitest'
import { parseJson, serializeCanonicalJson } from './serialization'

describe('serializeCanonicalJson', () => {
  it('sorts object keys recursively and keeps array order', () => {
    expect(
      serializeCanonicalJson({
        z: 1,
        a: {
          y: 2,
          b: 3,
        },
        list: [{ z: 1, a: 2 }],
      }),
    ).toBe(
      [
        '{',
        '  "a": {',
        '    "b": 3,',
        '    "y": 2',
        '  },',
        '  "list": [',
        '    {',
        '      "a": 2,',
        '      "z": 1',
        '    }',
        '  ],',
        '  "z": 1',
        '}',
      ].join('\n'),
    )
  })

  it('normalizes negative zero for reproducible output', () => {
    expect(serializeCanonicalJson({ value: -0 })).toContain('"value": 0')
  })

  it('rejects non-finite numbers', () => {
    expect(() => serializeCanonicalJson({ value: Number.NaN })).toThrow()
  })
})

describe('parseJson', () => {
  it('wraps malformed JSON as a SyntaxError', () => {
    expect(() => parseJson('{broken')).toThrow(SyntaxError)
  })
})
