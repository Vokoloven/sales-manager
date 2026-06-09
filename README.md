# Sales Manager

A modern sales intelligence platform built with Next.js 16 App Router. View and filter your CRM pipeline data in a high-performance table, and chat with an AI assistant that answers questions about your leads and deals in real time.

---

## Features

- **Feeds dashboard** — paginated, filterable sales table powered by TanStack Table with virtualized rows for large datasets
- **AI chat** — conversational interface over your CRM data; chat history persisted and listed in the sidebar with virtual scroll
- **Real-time updates** — Socket.io client keeps the chat view live
- **Google OAuth** — one-click sign-in with automatic access-token refresh
- **Compressed URL state** — active filters are LZ-string–encoded into the URL so views are shareable and bookmarkable
- **Parallel routes layout** — Next.js `@aside` / `@feeds` parallel segments keep the sidebar and main content independently streaming

---

## Tech Stack

| Layer        | Libraries                                                   |
| ------------ | ----------------------------------------------------------- |
| Framework    | Next.js 16.2.7 · React 19                                   |
| Language     | TypeScript 6                                                |
| Data / Forms | TanStack Table · TanStack Virtual · React Hook Form · Zod   |
| UI           | React Select · React Day Picker · Floating UI · CSS Modules |
| Real-time    | Socket.io client · RxJS                                     |
| Auth         | @react-oauth/google                                         |
| Content      | React Markdown · remark-gfm                                 |
| Utilities    | lz-string · qs                                              |
| Tooling      | ESLint · Prettier · Husky · lint-staged · Commitlint        |

---

## Project Structure

```
src/
├── app/
│   ├── (public)/
│   │   └── login/          # Google OAuth login page
│   └── (protected)/
│       ├── @aside/         # Sidebar parallel route (chat list, nav)
│       ├── @feeds/
│       │   ├── feeds/      # Sales dashboard with table & filters
│       │   └── chat/       # AI chat (list + [chatId] conversation view)
│       └── layout.tsx      # Root protected layout
├── components/             # Shared UI (Button, Input, Modal, GridTable…)
├── core/
│   ├── decorators/         # @CacheReact, @ApiValidator, @CatchApiError
│   ├── services/           # ApiService, TokenService, CookieService…
│   ├── hooks/
│   ├── models/
│   └── schemas/
└── css/                    # Global styles
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- An API backend URL and Google OAuth client ID

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
API_URL=https://your-backend-api.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### Run

```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Start the development server   |
| `npm run build`    | Create a production build      |
| `npm run start`    | Serve the production build     |
| `npm run lint`     | Run ESLint                     |
| `npm run lint:fix` | Run ESLint with auto-fix       |
| `npm run format`   | Format all files with Prettier |

---

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint. Pre-commit hooks (Husky + lint-staged) run ESLint and Prettier on staged files before every commit.

```
feat(chat): add rename conversation action
fix(feeds): correct pagination redirect on invalid params
```
