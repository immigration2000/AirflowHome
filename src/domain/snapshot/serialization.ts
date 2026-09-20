type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }

function toCanonicalJsonValue(value: unknown): JsonValue {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'boolean'
  ) {
    return value
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new RangeError('canonical JSON does not support non-finite numbers')
    }

    return Object.is(value, -0) ? 0 : value
  }

  if (Array.isArray(value)) {
    return value.map((entry) => toCanonicalJsonValue(entry))
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    const result: Record<string, JsonValue> = {}

    for (const key of Object.keys(record).sort()) {
      const entry = record[key]

      if (entry !== undefined) {
        result[key] = toCanonicalJsonValue(entry)
      }
    }

    return result
  }

  throw new TypeError(`unsupported canonical JSON value: ${typeof value}`)
}

export function serializeCanonicalJson(value: unknown): string {
  return JSON.stringify(toCanonicalJsonValue(value), null, 2)
}

export function parseJson(text: string): unknown {
  try {
    return JSON.parse(text) as unknown
  } catch (error) {
    throw new SyntaxError(
      `invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
