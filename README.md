# Keep Your Plants Alive

A plant care web application for houseplant owners. Browse a catalog of 90 species, build your own garden, track watering schedules, and keep a care journal for every plant.

**Live demo:** https://plant-care-henna.vercel.app/

---

## Features

### Public

- **Home page** — hero banner and feature overview
- **Plant catalog** — 90 species with filtering by light requirement, watering frequency, pet safety, and care difficulty
- **Search** — debounced search by plant name
- **Sorting** — by popularity or difficulty
- **Pagination** — 12 plants per page
- **Plant details** — care requirements, temperature range, soil type, and pet-safety information

### Authenticated

- **Registration and login** — httpOnly cookie-based sessions
- **Profile** — editable name, phone, and avatar upload
- **Statistics** — plant count and watering streak
- **My garden** — personal plant collection filtered by watering schedule
- **Plant management** — add, edit, and remove plants
- **Watering** — one-click watering log with automatic schedule recalculation
- **Care journal** — chronological history of watering events

---

## Tech Stack

| Technology                         | Purpose                        |
| ---------------------------------- | ------------------------------ |
| **Next.js 15** (App Router)        | Routing, server rendering, ISR |
| **TypeScript**                     | Static typing                  |
| **CSS Modules** + modern-normalize | Scoped styling                 |
| **TanStack Query**                 | Server state and caching       |
| **Zustand**                        | Authentication state           |
| **Formik** + **Yup**               | Forms and validation           |
| **Axios**                          | HTTP client                    |
| **react-hot-toast**                | Notifications                  |

---

## Project Structure

```
src/
├── app/                    Routes and layouts
│   ├── catalog/[id]/       Plant details (ISR)
│   ├── garden/[id]/        Personal plant page
│   ├── login/              Sign in
│   ├── register/           Sign up
│   ├── layout.tsx          Root layout
│   ├── error.tsx           Error boundary
│   └── not-found.tsx       404 page
│
├── components/             One folder per component
│   ├── Header/
│   ├── Footer/
│   ├── HeroBanner/
│   ├── PlantCard/
│   ├── PlantFilters/
│   ├── Modal/
│   └── ...
│
├── lib/
│   ├── api/                API request functions
│   └── validation/         Yup schemas
│
├── store/                  Zustand stores
├── types/                  TypeScript interfaces
└── styles/                 Design tokens
```

---

## Implementation Notes

**Server Components by default.** Only components that require state, hooks, or event handlers are marked as client components.

**URL-based filter state.** Catalog filters live in the query string, so filtered views are shareable and browser navigation works as expected.

**Incremental Static Regeneration.** Plant detail pages are statically generated and revalidated weekly.

**httpOnly cookie authentication.** Tokens are inaccessible to JavaScript; the browser sends them automatically via `withCredentials`.

**Mobile First.** Base styles target narrow viewports; wider layouts are added with `min-width` media queries. Breakpoints: 375px, 768px, 1440px.

**Design tokens.** Colors, typography, and radii are defined once as CSS custom properties and referenced throughout the project.

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
git clone https://github.com/dianapri0303/plant-care.git
cd plant-care
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=https://plant-care.b.goit.study
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

---

## Available Scripts

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `npm run dev`    | Start the development server with Turbopack |
| `npm run build`  | Create a production build                   |
| `npm run start`  | Serve the production build                  |
| `npm run lint`   | Run ESLint                                  |
| `npm run format` | Format the codebase with Prettier           |

---

## Author

**Diana Prihozhyna**
[GitHub](https://github.com/dianapri0303)
