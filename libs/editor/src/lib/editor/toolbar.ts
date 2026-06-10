import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'qalma-toolbar',
  imports: [],
  template: `<ng-content />`,
  host: {
    '[class.qalma-toolbar]': 'true',
    role: 'toolbar',
    '[attr.aria-label]': 'label()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QalmaToolbar {
  readonly label = input('Editor toolbar');
}
