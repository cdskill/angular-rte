import { Directive, computed, inject, input } from '@angular/core';

import { QALMA_EDITOR_CONTEXT } from './editor-context';

@Directive({
  selector: 'button[qalmaCommand]',
  host: {
    '(click)': 'execute()',
    '(mousedown)': 'preserveSelection($event)',
    '[attr.aria-pressed]': 'ariaPressed()',
    '[class.qalma-command-active]': 'active()',
    '[disabled]': 'disabled()',
  },
})
export class QalmaCommand {
  readonly command = input.required<string>({ alias: 'qalmaCommand' });
  readonly qalmaCommandValue = input<unknown>();

  private readonly context = inject(QALMA_EDITOR_CONTEXT);
  private readonly editor = computed(() => this.context.editor());

  protected readonly active = computed(() =>
    this.editor().isCommandActive(this.command()),
  );
  protected readonly disabled = computed(
    () =>
      !this.editor().canExecute(this.command(), this.qalmaCommandValue()),
  );
  protected readonly ariaPressed = computed(() =>
    this.editor().hasCommandState(this.command())
      ? String(this.active())
      : null,
  );

  protected execute(): void {
    this.editor().execute(this.command(), this.qalmaCommandValue());
  }

  protected preserveSelection(event: MouseEvent): void {
    event.preventDefault();
  }
}
