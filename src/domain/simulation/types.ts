export type DataSource =
  | 'measured'
  | 'provider'
  | 'user'
  | 'derived'
  | 'estimated'
  | 'unknown'

export interface Provenance {
  source: DataSource
  confidence: number
}

export interface SimulationWarning {
  code: string
  severity: 'info' | 'warning' | 'critical'
  message: string
}

export interface ModelVersions {
  outdoorWind: string
  indoorAirflow?: string
  ventilationScore?: string
  fanScore?: string
  heatScore?: string
}

export interface SimulationMeta {
  modelVersions: ModelVersions
  warnings: SimulationWarning[]
}
