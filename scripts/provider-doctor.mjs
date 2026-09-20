import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const envPath = resolve('.env.local')

function parseEnvFile(path) {
  if (!existsSync(path)) {
    return {}
  }

  const parsed = {}

  for (const rawLine of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')

    if (separatorIndex <= 0) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1)
    }

    parsed[key] = value
  }

  return parsed
}

const localEnv = parseEnvFile(envPath)

const requirements = [
  {
    key: 'VITE_KAKAO_MAP_JS_KEY',
    purpose: 'Kakao Map Web SDK feasibility',
  },
  {
    key: 'KAKAO_REST_API_KEY',
    purpose: 'Kakao address/coordinate REST feasibility',
  },
  {
    key: 'JUSO_CONFIRM_KEY',
    purpose: 'MOIS road-address / coordinate feasibility',
  },
  {
    key: 'DATA_GO_KR_SERVICE_KEY',
    purpose: 'KMA / BuildingHUB / AirKorea public-data feasibility',
  },
  {
    key: 'VWORLD_API_KEY',
    purpose: 'VWorld / GIS building WFS feasibility',
  },
]

function readValue(key) {
  const processValue = process.env[key]

  if (typeof processValue === 'string' && processValue.trim() !== '') {
    return processValue.trim()
  }

  const fileValue = localEnv[key]

  if (typeof fileValue === 'string' && fileValue.trim() !== '') {
    return fileValue.trim()
  }

  return ''
}

console.log('\nAirflowHome Provider Doctor\n')
console.log(
  existsSync(envPath)
    ? 'Source: environment variables + .env.local'
    : 'Source: environment variables (.env.local not found)',
)
console.log('Secret values are intentionally never printed.\n')

let missing = 0

for (const requirement of requirements) {
  const present = readValue(requirement.key) !== ''
  const marker = present ? '✓' : '✗'

  if (!present) {
    missing += 1
  }

  console.log(`${marker} ${requirement.key} — ${requirement.purpose}`)
}

if (missing > 0) {
  console.error(
    `\nNOT READY FOR FULL M0.7 LIVE TESTING: ${missing} provider credential(s) missing.`,
  )
  console.error(
    'Copy .env.example to .env.local, add development credentials, and enable each required provider API/service in its own console.',
  )
  process.exit(1)
}

console.log('\nREADY FOR M0.7 LIVE PROVIDER TESTING')
