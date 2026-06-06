import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideExternalLink,
  lucideLink,
  lucidePencil,
  lucideUnlink,
  lucideX,
} from '@ng-icons/lucide';

import { LinkPopover } from './link-popover.model';

@Component({
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideCheck,
      lucideExternalLink,
      lucideLink,
      lucidePencil,
      lucideUnlink,
      lucideX,
    }),
  ],
  selector: 'app-sandbox-link-popover',
  template: `
    @if (popover(); as popover) {
      <div
        data-link-popover
        role="dialog"
        aria-label="Link preview"
        class="fixed z-20 w-[min(360px,calc(100vw-32px))] rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-800 shadow-lg"
        [style.left.px]="popover.left"
        [style.top.px]="popover.top"
        (mouseenter)="keepOpen.emit()"
        (mouseleave)="scheduleHide.emit()"
        (focusin)="keepOpen.emit()"
        (focusout)="scheduleHide.emit()"
      >
        @if (popover.editing) {
          <div class="flex items-center gap-2">
            <label
              class="flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-300 px-2 text-sm focus-within:border-sky-600 focus-within:ring-2 focus-within:ring-sky-100"
            >
              <ng-icon
                class="shrink-0 text-slate-500"
                name="lucideLink"
                aria-hidden="true"
              />
              <input
                class="min-w-0 flex-1 bg-transparent outline-none"
                type="url"
                aria-label="Edit link URL"
                [value]="href()"
                (input)="updateHref($event)"
              />
            </label>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-45"
              [disabled]="!href().trim()"
              (click)="save.emit(popover)"
              title="Save link"
              aria-label="Save link"
            >
              <ng-icon name="lucideCheck" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-slate-500 hover:bg-slate-100"
              (click)="dismiss.emit()"
              title="Cancel"
              aria-label="Cancel"
            >
              <ng-icon name="lucideX" aria-hidden="true" />
            </button>
          </div>
        } @else {
          <div class="flex items-center gap-2">
            <a
              class="inline-flex min-w-0 flex-1 items-center gap-1.5 text-[#0000ee] underline visited:text-[#551a8b]"
              [href]="popover.href"
              [target]="popover.target ?? '_blank'"
              [rel]="popover.rel ?? 'noopener noreferrer'"
              title="Open link"
            >
              <span class="min-w-0 truncate font-medium">{{
                popover.href
              }}</span>
              <ng-icon
                class="shrink-0 text-base"
                name="lucideExternalLink"
                aria-hidden="true"
              />
            </a>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-sky-600 hover:bg-sky-50 hover:text-sky-900"
              (click)="edit.emit(popover)"
              title="Edit link"
              aria-label="Edit link"
            >
              <ng-icon name="lucidePencil" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700"
              (click)="remove.emit(popover)"
              title="Unlink"
              aria-label="Unlink"
            >
              <ng-icon name="lucideUnlink" aria-hidden="true" />
            </button>
          </div>
        }
      </div>
    }
  `,
})
export class SandboxLinkPopover {
  readonly popover = input<LinkPopover | null>(null);
  readonly href = input.required<string>();

  readonly hrefChange = output<string>();
  readonly edit = output<LinkPopover>();
  readonly save = output<LinkPopover>();
  readonly remove = output<LinkPopover>();
  readonly dismiss = output<void>();
  readonly keepOpen = output<void>();
  readonly scheduleHide = output<void>();

  protected updateHref(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
      this.hrefChange.emit(target.value);
    }
  }
}
