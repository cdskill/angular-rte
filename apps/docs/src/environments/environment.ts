export const environment = {
  production: false,
  posthogKey: import.meta.env['VITE_POSTHOG_KEY'] || '',
  posthogHost: import.meta.env['VITE_POSTHOG_HOST'] || '',
};
