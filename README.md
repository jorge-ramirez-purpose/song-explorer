# Song Explorer

A responsive React application for browsing, searching, filtering, and favoriting songs. Built as a Yousician web developer assignment.

## Setup

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
# Install dependencies (app + API)
npm install && cd api && npm install && cd ..

# Start the API server (port 3004)
npm run start-api

# In a separate terminal, start the dev server (port 5173)
npm run dev
```

Open http://localhost:5173 in your browser.

### Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run start-api` | Start the json-server API |

## What was built

### Core requirements

- **Infinite scroll list** — songs load in pages of 20 using `useInfiniteQuery`; an `IntersectionObserver` sentinel triggers the next page when scrolled into view
- **Loading indicator** — a spinner shows while songs are being fetched
- **Level filtering** — songs can be filtered by level (1–15) via a toggleable badge grid in the filter bar
- **Search** — debounced text search filters songs by artist or title
- **Favorites** — songs can be added to and removed from favorites with a heart button; mutations use optimistic updates with automatic rollback on failure
- **Responsive design** — fully responsive layout using Tailwind CSS utility classes

### Bonus features

- **Favorites-only view** — a dedicated view that shows only favorited songs, toggled via a heart button in the filter bar; supports the same search and level filters
- **URL params** — filter state (`search`, `level`, `favorites`) is synced to the URL, enabling shareable and bookmarkable states
- **Toast notifications** — success/error feedback on favorite mutations via a lightweight Zustand-based toast system
- **Error handling** — error boundary for unexpected crashes, retry button on fetch failures, contextual empty states for no results vs no favorites
- **Per-song loading state** — the heart button shows a loading state on the specific song being toggled, not globally
- **Tests** — unit tests for utility functions and custom hooks (Vitest), E2E tests for core user flows (Playwright)

## Technology decisions

| Technology | Why |
| --- | --- |
| **Vite** | Fast HMR and build times; native ESM dev server; zero-config TypeScript and React support |
| **TypeScript (strict)** | Catches bugs at compile time; combined with Zod for runtime validation of API responses, ensuring type safety across the entire data flow |
| **TanStack Query** | Handles data fetching, caching, infinite scroll pagination, and optimistic mutations out of the box — avoids reinventing these patterns manually |
| **Zustand** | Minimal API for global UI state (filters, toasts); no boilerplate compared to Redux; works well alongside TanStack Query for server state |
| **Tailwind CSS** | Utility-first approach keeps styles co-located with markup; design tokens (colors, fonts) defined once in the theme config via a central constants file |
| **Zod** | Runtime schema validation for API responses; generates TypeScript types from schemas, keeping them as a single source of truth |
| **Vitest + happy-dom** | Native Vite integration for unit tests; happy-dom is faster and more compatible than jsdom for this Node version |
| **Playwright** | Reliable browser-level E2E tests with route interception for controlling API responses |

## Architecture

```
src/
  api/          # Typed API client (fetch + Zod validation)
  components/   # UI components (presentational + composed)
  constants/    # Centralized color palette and design tokens
  hooks/        # Reusable hooks (useDebounce, useIntersectionObserver, useUrlParams)
  queries/      # TanStack Query hooks (songs, favorites, mutations)
  store/        # Zustand stores (filters, toasts)
  types/        # Zod schemas and inferred TypeScript types
  utils/        # Pure utility functions with unit tests
e2e/            # Playwright E2E specs
```

Key design decisions:

- **API client validates at the boundary** — all responses are parsed through Zod schemas before entering the app, so components can trust the data shape
- **Server state vs UI state separation** — TanStack Query owns server data (songs, favorites); Zustand owns UI-only state (filter selections, toasts)
- **URL as source of truth for filters** — the Zustand store hydrates from URL params on load, and a sync effect writes changes back to the address bar via `replaceState`
- **Optimistic mutations with rollback** — favorites are updated in the cache immediately and rolled back if the API call fails, with toast notifications for feedback
- **Vite proxy** — API requests are proxied to json-server in development, keeping the frontend on a single origin and avoiding CORS configuration
