# Tooling Policy

## Approved Core
Already included:
- React
- TypeScript
- Vite
- Vitest
- Zod
- ESLint

## Approved When Milestone Requires It
May be introduced after architecture review:
- mapping SDK/provider,
- Turf.js or equivalent geometry helper,
- Zustand,
- TanStack Query,
- Playwright.

## Not Approved by Default
Do not introduce without explicit need/approval:
- Three.js,
- Python backend,
- TensorFlow.js,
- OpenFOAM/CFD service,
- database/server state,
- new cloud service,
- global npm tooling.

## Dependency Rule
Before adding a package:
1. Confirm existing platform/code cannot reasonably solve the task.
2. Explain why the dependency is needed.
3. Confirm scope and maintenance cost.
4. Keep physics independent from framework-specific packages.
