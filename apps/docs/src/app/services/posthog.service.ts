import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import posthog, { PostHogConfig } from 'posthog-js';

@Injectable({ providedIn: 'root' })
export class PosthogService {
  private readonly platformId = inject(PLATFORM_ID);
  private initialized = false;

  get posthog(): typeof posthog {
    if (isPlatformBrowser(this.platformId) && this.initialized) {
      return posthog;
    }
    return new Proxy({} as typeof posthog, {
      get: () => () => undefined,
    });
  }

  init(apiKey: string, options: Partial<PostHogConfig>): void {
    if (isPlatformBrowser(this.platformId) && !this.initialized) {
      posthog.init(apiKey, options);
      this.initialized = true;
    }
  }
}
