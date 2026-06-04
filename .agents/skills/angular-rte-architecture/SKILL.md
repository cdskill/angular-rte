---
name: angular-rte-architecture
description: Guide architecture and product decisions for the Angular RTE repository. Use when discussing or changing the editor vision, public API, headless composition model, ProseMirror boundary, repository or library structure, plugin boundaries, scalability, roadmap, or a substantial refactor.
---

# Angular RTE Architecture

Protect the product direction while evolving the repository from its current
small foundation. Base decisions on the code that exists today and introduce
boundaries only when they solve a demonstrated problem.

## Start With Context

1. Read [product-vision.md](references/product-vision.md) for positioning,
   product principles, anti-goals, and roadmap.
2. Read [current-architecture.md](references/current-architecture.md) before
   deciding where code belongs or changing a public contract.
3. Inspect the relevant source files. Treat the references as durable intent,
   not a substitute for current repository state.

## Make An Architecture Decision

1. Classify the capability as core runtime, first-party plugin, Angular UI
   primitive, consumer UI, or tooling.
2. Preserve the headless composition model and the ProseMirror abstraction
   boundary.
3. Design the smallest coherent Angular-facing public API first.
4. Keep implementation-specific helpers private unless consumers need them.
5. Place the capability in the current `editor` library unless a concrete split
   criterion from `current-architecture.md` is met.
6. Explain the chosen boundary, rejected alternatives, tradeoffs, and the
   condition that would justify revisiting it.
7. Implement only the current evolutionary step when implementation is
   requested. Do not scaffold a speculative final monorepo.
8. Update the relevant architecture reference when the implemented decision
   changes durable repository intent or current structure.

## Preserve These Properties

- Angular-native and signal-first developer experience.
- Headless core with consumer-owned templates and styling.
- Typed, composable, independently selectable plugins.
- Stable Angular RTE contracts over raw ProseMirror contracts.
- Accessible behavior and observable command state.
- Small intentional public API and low mandatory bundle cost.
- Sandbox as executable consumer documentation.

## Coordinate With Plugin Work

Use `angular-rte-plugin-development` when an architectural decision becomes a
plugin implementation. Return here if that plugin requires a new extension
point, public contract, or library boundary.
