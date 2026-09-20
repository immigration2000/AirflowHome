import { existsSync, readFileSync } from 'node:fs'

const checks = []

function check(name, ok, detail = '') {
  checks.push({ name, ok, detail })
}

const [major] = process.versions.node.split('.').map(Number)
check('Node >= 22', major >= 22, process.version)

for (const file of [
  'README.md',
  'CLAUDE.md',
  'docs/CURRENT_STATE.md',
  'docs/ARCHITECTURE.md',
  'docs/DOMAIN_RULES.md',
  'docs/COORDINATE_SYSTEMS.md',
  'docs/UNITS.md',
  'docs/TESTING.md',
  'docs/TOOLING.md',
  'docs/MILESTONE_GATES.md',
  'docs/VALIDATION_PLAN.md',
  'docs/DATA_POLICY.md',
]) {
  check(file, existsSync(file))
}

check('package.json', existsSync('package.json'))
check('package-lock.json', existsSync('package-lock.json'))

if (existsSync('package.json')) {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
  check('verify script', typeof pkg.scripts?.verify === 'string')
  check('packageManager pinned', typeof pkg.packageManager === 'string')
}

check('dependencies installed', existsSync('node_modules'))

console.log('\nAirflowHome Doctor\n')
for (const item of checks) {
  const marker = item.ok ? '✓' : '✗'
  console.log(`${marker} ${item.name}${item.detail ? ` — ${item.detail}` : ''}`)
}

const failed = checks.filter((item) => !item.ok)
if (failed.length > 0) {
  console.error(`\nNOT READY: ${failed.length} check(s) failed.`)
  process.exit(1)
}

console.log('\nREADY')
