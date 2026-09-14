# BDC Data Portal Monorepo Assumption

## Overview

This repository hosts both the Context Providers library and the Core Framework application.

## Project Structure

```text
.
├── framework/        # Core Framework App (React + Typescript)
└── providers/        # Context Providers Library (React + Typescript)
```

## Global Prerequisites

Make sure the following are installed:

- Node.js 20
- npm
- Git
- Yalc

Check your versions:

```bash
node --version
npm --version
```

## Quick Start Development Workflow

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

Make sure to also clone the Study Palette.

### 2. Build and Publish Providers to Yalc:

From the repository root:

```bash
cd providers
npm install
yalc publish
npm run build
```

(npm run build automatically triggers yalc push --private via postbuild).

### 3. Link Providers to Framework and Study Palette, and Publish Study Palette to Yalc:

```bash
cd link/to/study-palette-ui
yalc add @tis-lab/context-providers
npm install
yalc publish --private
npm run build
```


```bash
cd ../framework
yalc add @tis-lab/context-providers
yalc add @tis-lab/study-palette-ui
npm install
npm start
```

The application will be available at:

```text
http://localhost:3000
```

The development server automatically recompiles the application when source files are changed.

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
