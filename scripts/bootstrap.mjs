import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const [major] = process.versions.node.split('.').map(Number)

if (major < 22) {
  console.error(`AirflowHome requires Node >= 22. Current: ${process.version}`)
  process.exit(1)
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function run(args) {
  const result = spawnSync(npmCommand, args, {
    stdio: 'inherit',
    shell: false,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const hasLockfile = existsSync('package-lock.json')

console.log(
  hasLockfile
    ? 'Installing reproducibly from package-lock.json...'
    : 'No package-lock.json found; creating initial dependency lock...',
)

run(hasLockfile ? ['ci'] : ['install'])

console.log('Running repository doctor...')
run(['run', 'doctor'])

console.log('Running verification...')
run(['run', 'verify'])

console.log('AirflowHome bootstrap complete.')
