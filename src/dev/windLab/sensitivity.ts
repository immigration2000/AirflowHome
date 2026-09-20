import type { WindLabScenario } from './scenarios'
import { deriveWindLabState } from './scenarios'

export interface WindLabSensitivityComparison {
  baseline: ReturnType<typeof deriveWindLabState>
  perturbed: ReturnType<typeof deriveWindLabState>
  flowVectorDeltaMagnitude: number
  speedDeltaMps: number
}

export function compareWindLabInputs(
  baselineInput: Pick<WindLabScenario, 'windFromDeg' | 'speedMps' | 'polygon'>,
  perturbedInput: Pick<WindLabScenario, 'windFromDeg' | 'speedMps' | 'polygon'>,
): WindLabSensitivityComparison {
  const baseline = deriveWindLabState(baselineInput)
  const perturbed = deriveWindLabState(perturbedInput)

  return {
    baseline,
    perturbed,
    flowVectorDeltaMagnitude: Math.hypot(
      perturbed.flowVector.xEast - baseline.flowVector.xEast,
      perturbed.flowVector.yNorth - baseline.flowVector.yNorth,
    ),
    speedDeltaMps: perturbed.speedMps - baseline.speedMps,
  }
}
