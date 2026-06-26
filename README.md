# Kickstarter UI Lib

Bundles Twilio Paste components to create opinionated, reusable form-field composites.

## Prerequisites

- Node.js 22+
- npm 10+

## Setup

```bash
npm install
```

## Running Storybook

Storybook is the primary environment for developing and browsing components. It runs on port 6006.

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) in your browser. Components are listed in the sidebar under **Components**. Each component has an **Autodocs** page showing all props and interactive controls, plus individual stories demonstrating specific states.

## Other Commands

```bash
npm run dev          # Vite dev server (app preview, not the primary dev environment)
npm run build        # TypeScript check + production build
npm run lint         # Oxlint
npm run build-storybook  # Static Storybook build
```

## Theming

Every story is wrapped in Twilio Paste's `Theme.Provider`. Use the **Theme** toolbar in Storybook to switch between `default`, `twilio`, `twilio-dark`, `dark`, `sendgrid`, and `evergreen` themes and preview how components look across all supported surfaces.
