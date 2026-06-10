import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';

import { QALMA_EDITOR_CONTEXT, QalmaEditorContext } from './editor-context';
import { QalmaEditorController } from './qalma-editor-controller';

@Component({
  selector: 'qalma-editor',
  imports: [],
  providers: [
    {
      provide: QALMA_EDITOR_CONTEXT,
      useExisting: forwardRef(() => QalmaEditor),
    },
  ],
  template: `<ng-content />`,
  host: {
    '[class.qalma-editor]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QalmaEditor implements QalmaEditorContext {
  readonly editor = input.required<QalmaEditorController>();
}
