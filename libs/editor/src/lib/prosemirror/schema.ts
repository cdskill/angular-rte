import { MarkSpec, NodeSpec, Schema } from 'prosemirror-model';

import { QalmaPlugin } from '../plugins/qalma-plugin';

const baseNodes: Record<string, NodeSpec> = {
  doc: {
    content: 'block+',
  },
  paragraph: {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM: () => ['p', 0] as const,
  },
  text: {
    group: 'inline',
  },
};

export function createQalmaSchema(plugins: readonly QalmaPlugin[]): Schema {
  assertUniquePluginKeys(plugins);

  const nodes: Record<string, NodeSpec> = { ...baseNodes };
  const marks: Record<string, MarkSpec> = {};

  for (const plugin of plugins) {
    addUniqueEntries(nodes, plugin.nodes, plugin.key, 'node');
    addUniqueEntries(marks, plugin.marks, plugin.key, 'mark');
  }

  for (const plugin of plugins) {
    extendExistingNodes(
      nodes,
      plugin.extendNodes?.(Object.freeze({ ...nodes })),
      plugin.key,
    );
  }

  return new Schema({
    nodes,
    marks,
  });
}

function assertUniquePluginKeys(plugins: readonly QalmaPlugin[]): void {
  const keys = new Set<string>();

  for (const plugin of plugins) {
    if (keys.has(plugin.key)) {
      throw new Error(`Duplicate QALMA plugin key "${plugin.key}".`);
    }

    keys.add(plugin.key);
  }
}

function addUniqueEntries<T>(
  target: Record<string, T>,
  entries: Record<string, T> | undefined,
  pluginKey: string,
  type: 'mark' | 'node',
): void {
  for (const [name, spec] of Object.entries(entries ?? {})) {
    if (target[name]) {
      throw new Error(
        `QALMA plugin "${pluginKey}" defines duplicate ${type} "${name}".`,
      );
    }

    target[name] = spec;
  }
}

function extendExistingNodes(
  nodes: Record<string, NodeSpec>,
  extensions: Record<string, NodeSpec> | undefined,
  pluginKey: string,
): void {
  for (const [name, spec] of Object.entries(extensions ?? {})) {
    if (!nodes[name]) {
      throw new Error(
        `QALMA plugin "${pluginKey}" extends unknown node "${name}".`,
      );
    }

    nodes[name] = spec;
  }
}
