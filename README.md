# BDC Data Portal Monorepo Assumption

## Overview

This repository hosts both the Context Providers library and the Core Framework application.

The framework also renders the Cohort Builder from
[`@tis-lab/study-palette-ui`](https://github.com/tis-lab/study-palette), which
is published separately from the
[study-palette](https://github.com/tis-lab/study-palette) repository. Both
`@tis-lab` packages are installed from GitHub Packages.

## Project Structure

```text
.
├── framework/        # Core Framework App (React + Typescript)
└── providers/        # Context Providers Library (React + Typescript)
```

## Global Prerequisites

Make sure the following are installed:

- Node.js 24
- npm
- Git
- Yalc (only needed for the local package development workflow below)

Check your versions:

```bash
node --version
npm --version
```

### Authenticate to GitHub Packages

The `@tis-lab` packages are hosted on GitHub Packages, which requires
authentication even for public packages. This is a one-time setup per machine.

1. Create a personal access token (classic) at
   <https://github.com/settings/tokens> with the **`read:packages`** scope.
   (Publishing a new version additionally requires `write:packages`.)

2. Add it to your **`~/.npmrc`** — your home directory, never the repository:

   ```text
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
   ```

Never commit a token. GitHub automatically revokes tokens it finds in pushed
code, which would break everyone else's installs. Each repository already
commits a token-free `.npmrc` that maps the `@tis-lab` scope to the registry.

If `npm install` fails with a `401`, the token is missing or expired. A `404`
for an `@tis-lab` package usually means you are running npm from a directory
without that scope mapping.

## Quick Start Development Workflow

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install and run the framework

```bash
cd framework
npm install
npm start
```

`@tis-lab/context-providers` and `@tis-lab/study-palette-ui` install from
GitHub Packages, so the Study Palette repository is not needed to run the app.

The application will be available at:

```text
http://localhost:3000
```

The development server automatically recompiles the application when source
files are changed.

## Working on the packages locally

The steps above consume the **published** packages. To test a change to
`providers/` (or to the Study Palette UI) before publishing it, link the
package with yalc so the framework picks up your local build:

```bash
cd providers
npm install
npm run build
npm run yalc:push
```

Then, in the consuming project:

```bash
cd ../framework
yalc link @tis-lab/context-providers
```

Use `yalc link`, not `yalc add`. Both point the framework at your local build,
but `add` rewrites the dependency in `package.json` to a `file:.yalc/...` path.
Those paths resolve only on a machine that has run yalc, so committing one
breaks cloud builds and a fresh clone. `link` leaves `package.json` alone and
symlinks the package into `node_modules` instead.

Re-run `npm run build && npm run yalc:push` in `providers/` after each change.

To return to the published package:

```bash
yalc remove @tis-lab/context-providers
npm install
```

## Publishing a new package version

```bash
cd providers
npm version <patch|minor|major> --no-git-tag-version
git tag context-providers-v<new version>
npm publish
```

`npm version` tags the whole repository, not the subdirectory. Without
`--no-git-tag-version` a bare `v0.1.1` tag would claim the repository root for
`providers` alone, and collide once `framework` is versioned too; the
namespaced tag keeps the two apart.

`prepublishOnly` rebuilds the package first, so the published tarball always
matches current source. Published versions are **immutable** — a version number
cannot be reused even after deleting it, so bump rather than republish.

## Deployment workflow

After making changes to the application:

1. Test the changes locally with the Core Framework Application:

```bash
npm start
```

2. Create a new production build:

```bash
npm run build
```

3. Commit the updated `build/` directory:

```bash
git add build
git commit -m "Update application"
git push
```

4. Open the application's **Project** in OpenShift.

5. Navigate to **Builds → Builds**.

6. Find the application's BuildConfig and select **Start Build**.

7. Start a new build using the updated Git repository.

8. Once the build completes, OpenShift deploys the new image.

9. Open the application's Route to verify the updated version.
