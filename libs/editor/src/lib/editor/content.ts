import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

import { QALMA_EDITOR_CONTEXT } from './editor-context';

@Component({
  selector: 'qalma-content',
  imports: [],
  template: `<div #editorHost class="qalma-content-surface"></div>`,
  host: {
    '[class.qalma-content]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QalmaContent {
  private readonly context = inject(QALMA_EDITOR_CONTEXT);
  private readonly destroyRef = inject(DestroyRef);

  private readonly editorHost =
    viewChild.required<ElementRef<HTMLDivElement>>('editorHost');

  private mountedHost?: HTMLElement;

  constructor() {
    afterNextRender(() => {
      const host = this.editorHost().nativeElement;

      this.context.editor().mount(host);
      this.mountedHost = host;
    });

    this.destroyRef.onDestroy(() => {
      if (this.mountedHost) {
        this.context.editor().unmount(this.mountedHost);
      }
    });
  }
}
