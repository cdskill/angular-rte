# Product Vision

## North Star

Angular RTE should become the modern rich text editor toolkit Angular developers
reach for when they want the power and extensibility associated with Plate or
Tiptap without adopting a React-oriented abstraction.

It is not merely an Angular wrapper around ProseMirror. ProseMirror is the
editing engine; Angular RTE is the coherent Angular-native authoring,
composition, state, and extension experience built above it.

## Positioning

The editor should be:

- **Angular-first:** standalone APIs, signals, dependency injection, directives,
  content projection, and Angular templates are first-class concepts.
- **Headless:** consumers own toolbar composition, styling, layout, and which
  features are present.
- **Plugin-first:** editor capabilities are independently selectable,
  configurable, typed, and composable.
- **Production-ready:** accessibility, predictable serialization, testing,
  performance, and failure modes matter as much as visible features.
- **Progressively adoptable:** a basic editor is small and understandable;
  advanced features add cost only when selected.

## Product Principles

### Consumer-Owned Composition

Consumers configure the editor in TypeScript and explicitly compose UI in their
Angular templates. The core must never render a toolbar or infer buttons from
the plugin array.

### Angular Contracts Over Engine Leakage

Use ProseMirror internally, but expose Angular RTE-owned plugin contracts,
options, commands, state queries, and components. Raw ProseMirror access may be
added later as an intentional advanced escape hatch, not as the default API.

### Plugins Describe Capability, Not Presentation

A plugin can contribute document schema, commands, state queries, shortcuts,
and engine behavior. Presentation remains a consumer or optional UI-layer
concern.

### Evolution Before Extraction

Keep tightly related first-party plugins together while the extension contract
is young. Extract packages only after dependency weight, release cadence,
ownership, or independent consumption proves the boundary.

### Defaults Without Lock-In

Offer useful kits and defaults while preserving individual plugin selection and
configuration. A kit is a convenience array, not a special runtime concept.

## Anti-Goals

- Do not clone Plate feature-for-feature without translating the experience to
  Angular.
- Do not build a fixed WYSIWYG component with a mandatory toolbar.
- Do not make one Nx library or npm package per trivial plugin by default.
- Do not expose every ProseMirror helper through the public barrel.
- Do not introduce speculative abstraction layers for features that do not yet
  exist.
- Do not let sandbox-only styling or behavior leak into the editor library.

## Product Roadmap

Use this as direction, not as permission to build everything at once.

1. **Foundation:** headless primitives, typed plugin contract, commands,
   command state, serialization, and consumer composition.
2. **Essential authoring:** text formatting, history, links, headings, lists,
   block quotes, code, and clear formatting.
3. **Modern interaction:** contextual toolbars, slash commands, placeholders,
   selections, drag handles, and polished keyboard behavior.
4. **Structured content:** tables, media, embeds, mentions, custom node views,
   and robust paste/import handling.
5. **Platform maturity:** collaboration, comments, versioning, extensible
   serialization, SSR strategy, accessibility guarantees, documentation, and
   publishable packages.

At every stage, prefer a small end-to-end vertical slice over a wide incomplete
surface.
