# @qalma/editor

Headless Angular components and plugin primitives for the Qalma editor.

```ts
const editor = createQalmaEditor({
  plugins: [
    ...TextFormattingKit,
    HistoryPlugin.configure({
      depth: 200,
      newGroupDelay: 750,
    }),
  ],
});
```

```html
<qalma-editor [editor]="editor">
  <qalma-toolbar>
    <button qalmaCommand="toggleBold">Bold</button>
    <button qalmaCommand="undo">Undo</button>
    <button qalmaCommand="redo">Redo</button>
  </qalma-toolbar>

  <qalma-content />
</qalma-editor>
```
