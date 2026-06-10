import { InjectionToken, Signal } from '@angular/core';

import { QalmaEditorController } from './qalma-editor-controller';

export interface QalmaEditorContext {
  readonly editor: Signal<QalmaEditorController>;
}

export const QALMA_EDITOR_CONTEXT = new InjectionToken<QalmaEditorContext>(
  'QALMA_EDITOR_CONTEXT',
);
