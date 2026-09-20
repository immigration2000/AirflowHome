import { windFromToDeg } from './domain/wind/wind'

export default function App() {
  const exampleFromDeg = 225
  const exampleToDeg = windFromToDeg(exampleFromDeg)

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">AirflowHome</p>
        <h1>Residential ventilation simulation foundation</h1>
        <p>
          The repository is bootstrapped for Claude Code. Current development
          state is documented in <code>docs/CURRENT_STATE.md</code>.
        </p>
        <div className="status-card">
          <strong>Wind convention smoke test</strong>
          <span>
            FROM {exampleFromDeg}° → TO {exampleToDeg}°
          </span>
        </div>
      </section>
    </main>
  )
}
