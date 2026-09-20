import WindLab from './dev/windLab/WindLab'

function Home() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">AirflowHome</p>
        <h1>Residential ventilation simulation foundation</h1>
        <p>
          The repository foundation and domain contracts are verified. Current
          development is the provider-free M0.5 Wind / Geometry Lab.
        </p>
        <div className="status-card">
          <strong>M0.5 developer surface</strong>
          <span>
            Verify wind FROM/TO, +X East / +Y North vectors, local geometry, and
            building-face normals before connecting any live provider.
          </span>
          <a className="primary-link" href="/dev/wind-lab">
            Open Wind Lab →
          </a>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  if (window.location.pathname === '/dev/wind-lab') {
    return <WindLab />
  }

  return <Home />
}
