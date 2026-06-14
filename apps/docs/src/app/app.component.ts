import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PosthogService } from './services/posthog.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly posthogService = inject(PosthogService);

  ngOnInit(): void {
    if (!environment.posthogKey) {
      return;
    }

    this.posthogService.init(environment.posthogKey, {
      api_host: environment.posthogHost,
      defaults: '2026-01-30',
      capture_exceptions: true,
      persistence: 'memory', // cookieless: no consent banner needed (RGPD)
    });
  }
}
