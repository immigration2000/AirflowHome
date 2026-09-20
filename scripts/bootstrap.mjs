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

console.log('Installing dependencies...')
run(['install'])

console.log('Running repository doctor...')
run(['run', 'doctor'])

console.log('Running verification...')
run(['run', 'verify'])

console.log('AirflowHome bootstrap complete.')
