import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

import { QalmaPlugin } from '../plugins/qalma-plugin';
import { parseHtmlDocument } from './html';
import { createBasePlugins } from './plugins';

interface QalmaStateOptions {
  html: string;
  plugins: readonly QalmaPlugin[];
  schema: Schema;
}

export function createQalmaState(options: QalmaStateOptions): EditorState {
  return EditorState.create({
    doc: parseHtmlDocument(options.html, options.schema),
    schema: options.schema,
    plugins: createBasePlugins(options.schema, options.plugins),
  });
}
