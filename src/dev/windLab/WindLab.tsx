import { useMemo, useState } from 'react'
import type { LocalMeterPoint, WorldVector2 } from '../../domain/geo/types'
import {
  deriveWindLabState,
  getWindLabScenario,
  WIND_LAB_SCENARIOS,
} from './scenarios'
import {
  createWindLabSnapshot,
  serializeWindLabSnapshot,
} from './snapshot'

const SVG_WIDTH = 640
const SVG_HEIGHT = 460
const CENTER_X = SVG_WIDTH / 2
const CENTER_Y = SVG_HEIGHT / 2
const PIXELS_PER_METER = 12
const NORMAL_LENGTH_PX = 36
const FLOW_HALF_LENGTH_PX = 92

function toSvg(point: LocalMeterPoint) {
  return {
    x: CENTER_X + point.xMeters * PIXELS_PER_METER,
    y: CENTER_Y - point.yMeters * PIXELS_PER_METER,
  }
}

function vectorEnd(
  origin: { x: number; y: number },
  vector: WorldVector2,
  lengthPx: number,
) {
  return {
    x: origin.x + vector.xEast * lengthPx,
    y: origin.y - vector.yNorth * lengthPx,
  }
}

function formatNumber(value: number, digits = 3) {
  const normalized = Math.abs(value) < 1e-12 ? 0 : value
  return normalized.toFixed(digits)
}

export default function WindLab() {
  const initialScenario = getWindLabScenario(WIND_LAB_SCENARIOS[0].id)
  const [scenarioId, setScenarioId] = useState(initialScenario.id)
  const [windFromDeg, setWindFromDeg] = useState(initialScenario.windFromDeg)
  const [speedMps, setSpeedMps] = useState(initialScenario.speedMps)
  const [snapshotSimulationAt] = useState(() => new Date().toISOString())
  const [snapshotTimeZone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  )
  const [copyStatus, setCopyStatus] = useState('')

  const scenario = useMemo(() => getWindLabScenario(scenarioId), [scenarioId])

  const derived = useMemo(
    () =>
      deriveWindLabState({
        ...scenario,
        windFromDeg,
        speedMps,
      }),
    [scenario, windFromDeg, speedMps],
  )

  const snapshotJson = useMemo(
    () =>
      serializeWindLabSnapshot(
        createWindLabSnapshot({
          windFromDeg,
          speedMps,
          polygon: scenario.polygon,
          simulationTime: {
            simulationAt: snapshotSimulationAt,
            timeZone: snapshotTimeZone,
          },
          confidence: {
            geometry: 1,
            overall: 1,
          },
        }),
      ),
    [
      scenario.polygon,
      snapshotSimulationAt,
      snapshotTimeZone,
      speedMps,
      windFromDeg,
    ],
  )

  const polygonPoints = derived.polygon
    .map((point) => {
      const svgPoint = toSvg(point)
      return `${svgPoint.x},${svgPoint.y}`
    })
    .join(' ')

  const flowStart = vectorEnd(
    { x: CENTER_X, y: CENTER_Y },
    derived.flowVector,
    -FLOW_HALF_LENGTH_PX,
  )
  const flowEnd = vectorEnd(
    { x: CENTER_X, y: CENTER_Y },
    derived.flowVector,
    FLOW_HALF_LENGTH_PX,
  )

  function selectScenario(nextId: string) {
    const next = getWindLabScenario(nextId)
    setScenarioId(next.id)
    setWindFromDeg(next.windFromDeg)
    setSpeedMps(next.speedMps)
    setCopyStatus('')
  }

  async function copySnapshot() {
    try {
      await navigator.clipboard.writeText(snapshotJson)
      setCopyStatus('Copied')
    } catch {
      setCopyStatus('Copy unavailable — select the JSON manually')
    }
  }

  return (
    <main className="lab-shell">
      <header className="lab-header">
        <div>
          <a className="back-link" href="/">
            ← AirflowHome
          </a>
          <p className="eyebrow">M0.6 · Developer Validation Tool</p>
          <h1>Wind / Geometry Lab</h1>
          <p>
            Provider-free verification surface for meteorological wind direction,
            world vectors, local-meter geometry, and building-face normals.
          </p>
        </div>
        <div className="lab-badge">Mock data only</div>
      </header>

      <section className="lab-grid">
        <aside className="lab-panel controls-panel">
          <h2>Scenario</h2>

          <label className="field">
            <span>Preset</span>
            <select
              value={scenarioId}
              onChange={(event) => selectScenario(event.target.value)}
            >
              {WIND_LAB_SCENARIOS.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Wind FROM</span>
            <div className="value-row">
              <input
                type="range"
                min="0"
                max="359"
                step="1"
                value={windFromDeg}
                onChange={(event) => setWindFromDeg(Number(event.target.value))}
              />
              <input
                className="number-input"
                type="number"
                min="0"
                max="359"
                step="1"
                value={windFromDeg}
                onChange={(event) => {
                  const value = Number(event.target.value)
                  if (Number.isFinite(value)) {
                    setWindFromDeg(value)
                  }
                }}
              />
              <span>°</span>
            </div>
          </label>

          <label className="field">
            <span>Wind speed</span>
            <div className="value-row">
              <input
                type="range"
                min="0"
                max="15"
                step="0.1"
                value={speedMps}
                onChange={(event) => setSpeedMps(Number(event.target.value))}
              />
              <input
                className="number-input"
                type="number"
                min="0"
                step="0.1"
                value={speedMps}
                onChange={(event) => {
                  const value = Number(event.target.value)
                  if (Number.isFinite(value) && value >= 0) {
                    setSpeedMps(value)
                  }
                }}
              />
              <span>m/s</span>
            </div>
          </label>

          <div className="metric-stack">
            <div className="metric-card">
              <span>FROM</span>
              <strong>{formatNumber(derived.windFromDeg, 1)}°</strong>
            </div>
            <div className="metric-card">
              <span>TO</span>
              <strong>{formatNumber(derived.windToDeg, 1)}°</strong>
            </div>
            <div className="metric-card">
              <span>Flow vector</span>
              <strong>
                ({formatNumber(derived.flowVector.xEast)},{' '}
                {formatNumber(derived.flowVector.yNorth)})
              </strong>
              <small>+X East / +Y North</small>
            </div>
          </div>
        </aside>

        <section className="lab-panel canvas-panel">
          <div className="panel-heading">
            <div>
              <h2>Local-meter geometry</h2>
              <p>SVG Y is flipped only for display. Domain Y remains North-positive.</p>
            </div>
            <div className="axis-key">
              <span>↑ N (+Y)</span>
              <span>→ E (+X)</span>
            </div>
          </div>

          <svg
            className="wind-canvas"
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            role="img"
            aria-label="Wind vector and building face normals"
          >
            <defs>
              <marker
                id="arrow-flow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" className="flow-marker" />
              </marker>
              <marker
                id="arrow-normal"
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0,0 L7,3.5 L0,7 Z" className="normal-marker" />
              </marker>
            </defs>

            <line
              className="axis-line"
              x1={CENTER_X}
              y1="24"
              x2={CENTER_X}
              y2={SVG_HEIGHT - 24}
            />
            <line
              className="axis-line"
              x1="24"
              y1={CENTER_Y}
              x2={SVG_WIDTH - 24}
              y2={CENTER_Y}
            />

            <polygon className="building-polygon" points={polygonPoints} />

            {derived.faces.map((face) => {
              const start = toSvg(face.start)
              const end = toSvg(face.end)
              const midpoint = {
                x: (start.x + end.x) / 2,
                y: (start.y + end.y) / 2,
              }
              const normalEnd = vectorEnd(
                midpoint,
                face.outwardNormal,
                NORMAL_LENGTH_PX,
              )

              return (
                <g key={face.index}>
                  <line
                    className="normal-line"
                    x1={midpoint.x}
                    y1={midpoint.y}
                    x2={normalEnd.x}
                    y2={normalEnd.y}
                    markerEnd="url(#arrow-normal)"
                  />
                  <text
                    className="face-label"
                    x={normalEnd.x}
                    y={normalEnd.y - 8}
                    textAnchor="middle"
                  >
                    F{face.index}
                  </text>
                </g>
              )
            })}

            <line
              className="flow-line"
              x1={flowStart.x}
              y1={flowStart.y}
              x2={flowEnd.x}
              y2={flowEnd.y}
              markerEnd="url(#arrow-flow)"
            />
            <circle className="origin-dot" cx={CENTER_X} cy={CENTER_Y} r="4" />
            <text className="north-label" x={CENTER_X + 8} y="32">
              N
            </text>
            <text
              className="east-label"
              x={SVG_WIDTH - 38}
              y={CENTER_Y - 8}
            >
              E
            </text>
          </svg>

          <div className="legend">
            <span>
              <i className="legend-flow" /> Flow TO
            </span>
            <span>
              <i className="legend-normal" /> Face outward normal
            </span>
          </div>
        </section>
      </section>

      <section className="lab-panel snapshot-panel">
        <div className="panel-heading">
          <div>
            <h2>Deterministic debug snapshot</h2>
            <p>
              Versioned normalized input/result metadata. Re-exporting the same
              snapshot produces the same canonical JSON.
            </p>
          </div>
          <button className="copy-button" type="button" onClick={copySnapshot}>
            Copy snapshot
          </button>
        </div>
        <div className="snapshot-meta">
          <span>simulationAt: {snapshotSimulationAt}</span>
          <span>timeZone: {snapshotTimeZone}</span>
          {copyStatus ? <strong>{copyStatus}</strong> : null}
        </div>
        <textarea
          className="snapshot-json"
          readOnly
          spellCheck={false}
          value={snapshotJson}
          aria-label="Wind Lab debug snapshot JSON"
        />
      </section>

      <section className="lab-panel face-panel">
        <div className="panel-heading">
          <div>
            <h2>Derived building faces</h2>
            <p>
              Counter-clockwise polygon winding is required. Normal angles use
              meteorological convention.
            </p>
          </div>
        </div>

        <div className="face-table-wrap">
          <table className="face-table">
            <thead>
              <tr>
                <th>Face</th>
                <th>Length</th>
                <th>Normal TO</th>
                <th>xEast</th>
                <th>yNorth</th>
              </tr>
            </thead>
            <tbody>
              {derived.faces.map((face) => (
                <tr key={face.index}>
                  <td>F{face.index}</td>
                  <td>{formatNumber(face.lengthMeters, 2)} m</td>
                  <td>{formatNumber(face.normalToDeg, 1)}°</td>
                  <td>{formatNumber(face.outwardNormal.xEast)}</td>
                  <td>{formatNumber(face.outwardNormal.yNorth)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
