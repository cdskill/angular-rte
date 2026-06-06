import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RteCommand, RteEditorController, RteToolbar } from '@angular-rte/editor';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBold,
  lucideEraser,
  lucideHeading1,
  lucideHeading2,
  lucideHeading3,
  lucideIndent,
  lucideItalic,
  lucideLink,
  lucideList,
  lucideListOrdered,
  lucideOutdent,
  lucidePilcrow,
  lucideRedo2,
  lucideSquareCode,
  lucideStrikethrough,
  lucideTextQuote,
  lucideUnderline,
  lucideUndo2,
  lucideUnlink,
} from '@ng-icons/lucide';

import {
  SANDBOX_CODE_BLOCK_LANGUAGES,
  SANDBOX_DEFAULT_CODE_BLOCK_LANGUAGE,
} from './sandbox-code-block';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RteCommand, RteToolbar],
  providers: [
    provideIcons({
      lucideBold,
      lucideEraser,
      lucideHeading1,
      lucideHeading2,
      lucideHeading3,
      lucideIndent,
      lucideItalic,
      lucideLink,
      lucideList,
      lucideListOrdered,
      lucideOutdent,
      lucidePilcrow,
      lucideRedo2,
      lucideSquareCode,
      lucideStrikethrough,
      lucideTextQuote,
      lucideUnderline,
      lucideUndo2,
      lucideUnlink,
    }),
  ],
  selector: 'app-sandbox-toolbar',
  template: `
    <rte-toolbar
      class="flex flex-wrap items-center gap-1.5 border-b border-slate-200 bg-slate-50 p-2"
    >
      <button
        type="button"
        [class]="commandClass"
        rteCommand="setParagraph"
        title="Paragraph"
        aria-label="Paragraph"
      >
        <ng-icon name="lucidePilcrow" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleHeading1"
        title="Heading 1"
        aria-label="Heading 1"
      >
        <ng-icon name="lucideHeading1" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleHeading2"
        title="Heading 2"
        aria-label="Heading 2"
      >
        <ng-icon name="lucideHeading2" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleHeading3"
        title="Heading 3"
        aria-label="Heading 3"
      >
        <ng-icon name="lucideHeading3" aria-hidden="true" />
      </button>
      <span class="mx-1 h-5 w-px bg-slate-300" aria-hidden="true"></span>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleBold"
        title="Bold"
        aria-label="Bold"
      >
        <ng-icon name="lucideBold" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleItalic"
        title="Italic"
        aria-label="Italic"
      >
        <ng-icon name="lucideItalic" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleUnderline"
        title="Underline"
        aria-label="Underline"
      >
        <ng-icon name="lucideUnderline" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleStrike"
        title="Strikethrough"
        aria-label="Strikethrough"
      >
        <ng-icon name="lucideStrikethrough" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="clearFormatting"
        title="Clear formatting"
        aria-label="Clear formatting"
      >
        <ng-icon name="lucideEraser" aria-hidden="true" />
      </button>
      <span class="mx-1 h-5 w-px bg-slate-300" aria-hidden="true"></span>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleBulletList"
        title="Bullet list"
        aria-label="Bullet list"
      >
        <ng-icon name="lucideList" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleOrderedList"
        title="Ordered list"
        aria-label="Ordered list"
      >
        <ng-icon name="lucideListOrdered" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleBlockquote"
        title="Blockquote"
        aria-label="Blockquote"
      >
        <ng-icon name="lucideTextQuote" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="toggleCodeBlock"
        title="Code block"
        aria-label="Code block"
      >
        <ng-icon name="lucideSquareCode" aria-hidden="true" />
      </button>
      @if (codeBlockActive()) {
        <select
          [class]="languageSelectClass"
          [value]="codeBlockLanguage()"
          (change)="setCodeBlockLanguage($event)"
          aria-label="Code block language"
        >
          @for (language of codeBlockLanguages; track language.value) {
            <option
              [value]="language.value"
              [selected]="language.value === codeBlockLanguage()"
            >
              {{ language.label }}
            </option>
          }
        </select>
      }
      <button
        type="button"
        [class]="commandClass"
        rteCommand="liftListItem"
        title="Lift list item"
        aria-label="Lift list item"
      >
        <ng-icon name="lucideOutdent" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="sinkListItem"
        title="Sink list item"
        aria-label="Sink list item"
      >
        <ng-icon name="lucideIndent" aria-hidden="true" />
      </button>
      <span class="mx-1 h-5 w-px bg-slate-300" aria-hidden="true"></span>
      <button
        type="button"
        [class]="commandClass"
        [class.rte-command-active]="linkActive()"
        [attr.aria-pressed]="linkActive()"
        [disabled]="!canSetLink()"
        (mousedown)="preserveSelection($event)"
        (click)="requestLink.emit($event)"
        title="Link"
        aria-label="Link"
      >
        <ng-icon name="lucideLink" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="unsetLink"
        title="Unlink"
        aria-label="Unlink"
      >
        <ng-icon name="lucideUnlink" aria-hidden="true" />
      </button>
      <span class="mx-1 h-5 w-px bg-slate-300" aria-hidden="true"></span>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="undo"
        title="Undo"
        aria-label="Undo"
      >
        <ng-icon name="lucideUndo2" aria-hidden="true" />
      </button>
      <button
        type="button"
        [class]="commandClass"
        rteCommand="redo"
        title="Redo"
        aria-label="Redo"
      >
        <ng-icon name="lucideRedo2" aria-hidden="true" />
      </button>
    </rte-toolbar>
  `,
})
export class SandboxToolbar {
  readonly editor = input.required<RteEditorController>();
  readonly requestLink = output<MouseEvent>();

  protected readonly canSetLink = computed(() =>
    this.editor().canExecute('setLink', 'https://angular.dev'),
  );
  protected readonly linkActive = computed(() =>
    this.editor().isCommandActive('setLink'),
  );
  protected readonly codeBlockActive = computed(() =>
    this.editor().isCommandActive('toggleCodeBlock'),
  );
  protected readonly codeBlockLanguage = computed(
    () =>
      this.editor().query<string>('codeBlockLanguage') ??
      SANDBOX_DEFAULT_CODE_BLOCK_LANGUAGE,
  );

  protected readonly codeBlockLanguages = SANDBOX_CODE_BLOCK_LANGUAGES;
  protected readonly commandClass =
    'inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 transition hover:border-sky-600 hover:bg-sky-50 hover:text-sky-900 disabled:cursor-not-allowed disabled:opacity-45 [&.rte-command-active]:border-sky-600 [&.rte-command-active]:bg-sky-50 [&.rte-command-active]:text-sky-900';
  protected readonly languageSelectClass =
    'h-8 rounded-md border border-slate-300 bg-white px-2 text-xs font-medium text-slate-700 transition hover:border-sky-600 hover:bg-sky-50 hover:text-sky-900 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200';

  protected preserveSelection(event: MouseEvent): void {
    event.preventDefault();
  }

  protected setCodeBlockLanguage(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLSelectElement) {
      this.editor().execute('setCodeBlockLanguage', target.value);
    }
  }
}
