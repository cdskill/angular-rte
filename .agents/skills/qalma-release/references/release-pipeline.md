# Release Pipeline

## Package

- `@qalma/editor` — scoped, public npm package, built from `libs/editor` with
  `@nx/angular:package` (ng-packagr, partial Angular compilation).
- `libs/editor/package.json` carries `publishConfig: { access: "public", tag:
  "alpha" }`, `repository`, `bugs`, `homepage`, `keywords`, and the
  `@angular/core` peer range. This file is the manifest that ships to npm.
- `libs/editor/ng-package.json` configures the ng-packagr build:
  `dest: "../../dist/libs/editor"`, `allowedNonPeerDependencies` for the
  `prosemirror-*` packages + `tslib`, entry `src/index.ts`.

## Nx Release Configuration (`nx.json`)

```jsonc
"release": {
  "projects": ["editor"],
  "version": {
    "preVersionCommand": "pnpm nx build editor",
    "manifestRootsToUpdate": ["{projectRoot}", "dist/libs/editor"]
  },
  "changelog": {
    "workspaceChangelog": false,
    "projectChangelogs": false
  }
}
```

- Single project ("editor") with no `projectsRelationship` → defaults to
  `fixed`, so the release tag pattern is `v{version}` (matches the
  `on: push: tags: 'v*'` trigger in the workflow).
- `preVersionCommand` rebuilds the lib so `dist/libs/editor/package.json`
  exists before its version is rewritten.
- Changelog generation is off; rely on conventional commits in git history
  instead.

`targetDefaults.nx-release-publish` (also in `nx.json`) configures the publish
target used by CI:

```jsonc
"nx-release-publish": {
  "dependsOn": ["build"],
  "options": {
    "packageRoot": "dist/libs/editor",
    "access": "public",
    "registry": "https://registry.npmjs.org/",
    "tag": "alpha"
  }
}
```

## Local Release Scripts (`package.json`)

```jsonc
"release": "nx release --skip-publish",
"release:dry-run": "nx release --skip-publish --dry-run"
```

`nx release <specifier> --skip-publish` defaults (confirmed via
`--printConfig` / dry-run on this workspace):

- `git.commit = true`, message `chore(release): publish {version}`.
- `git.tag = true`, pattern `v{version}`, `stageChanges = true`.
- Publish step is skipped (auto-answers "no" to the publish prompt).

This intentionally leaves the actual `npm publish` to CI.

## GitHub Actions Workflow (`.github/workflows/release.yml`)

- Trigger: `push: tags: 'v*'`.
- Permissions: `contents: read`, `id-token: write` (required for npm OIDC
  Trusted Publishing).
- Steps:
  1. Checkout with full history (`fetch-depth: 0`).
  2. Setup pnpm 10.23.0, Node 24.x with `registry-url:
     https://registry.npmjs.org`.
  3. `npm install --global npm@latest` (Trusted Publishing needs a recent npm
     CLI).
  4. `pnpm install --frozen-lockfile`.
  5. Validate: `nx run-many -t lint`, `tsc --noEmit` for editor/sandbox/
     sandbox-e2e, `nx build sandbox`.
  6. Resolve version from `GITHUB_REF_NAME` (strip leading `v`); check
     `npm view @qalma/editor version` to set `first_release` for the very
     first publish.
  7. `pnpm nx release version <version> [--first-release] --git-commit=false
     --git-tag=false --stage-changes=false` — re-applies the version to
     `libs/editor/package.json` and `dist/libs/editor/package.json` inside the
     CI checkout (independent of whatever was committed locally).
  8. `npm publish dist/libs/editor --access public --tag alpha --provenance`.

## npm Trusted Publisher (OIDC)

Configured on the `@qalma/editor` npm package settings page:

- Publisher: GitHub Actions
- Organization or user / Repository: `cdskill` / `angular-rte`
- Workflow filename: `release.yml` (file lives at
  `.github/workflows/release.yml`)
- Environment name: empty (the `publish` job has no `environment:` key)
- Allowed actions: "Allow npm publish" only ("Allow npm stage publish" is
  unused by this workflow)

With Trusted Publishing configured, CI needs no npm token/secret — `npm
publish --provenance` authenticates via the GitHub Actions OIDC token.

"Publishing access" on the package can be set to "Require two-factor
authentication and disallow tokens (recommended)" — Trusted Publishers work
under either setting, so this is the stricter option for any remaining manual
publishes.

## Bootstrap History

`0.0.1-alpha.0` was published manually before Trusted Publishing existed, using
a granular access token scoped to `@qalma` plus `npm publish --otp=<code>`
(npm requires 2FA-or-token-with-2FA-bypass to publish; the account has 2FA
required for publishing, hence `--otp`). That bootstrap token should be revoked
once a CI-driven release via Trusted Publishing has succeeded.

## Troubleshooting

- `npm error 403 ... Two-factor authentication or granular access token with
  bypass 2fa enabled is required to publish packages.` — the npm account
  requires 2FA for publishing. For a manual publish, pass `--otp=<TOTP>`. CI
  publishes avoid this entirely via Trusted Publishing.
- If the workflow's "Resolve release version" step reports the tag version
  already exists on npm (and `first_release` is incorrectly `true`), the tag
  was likely pushed for a version already published — delete the tag and
  re-tag with the next version instead.
