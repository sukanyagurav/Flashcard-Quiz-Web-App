# 🧠 FlashMaster — Flashcard & Quiz Web App

A modern, production-ready flashcard study application built with React, TypeScript, and Tailwind CSS. Features a bold, sketch-inspired design with smooth animations, dark mode, and persistent local storage.


- [Github](https://github.com/sukanyagurav/Flashcard-Quiz-Web-App)
- [Netlify](https://flash-card-app-2.netlify.app/)

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4) ![Zustand](https://img.shields.io/badge/Zustand-5-orange)

## Preview

![FlashMaster — Flashcard & Quiz Web App](./public/mobile%20design1.jpg)
---

## ✨ Features

### 📚 Study Mode
- **Interactive flashcards** — Click to flip between question and answer
- **Mastery tracking** — 5-level progress system per card (0–5)
- **Category filtering** — Filter cards by topic via dropdown
- **Hide mastered cards** — Toggle to focus on cards you're still learning
- **Shuffle** — Randomize card order for varied study sessions
- **Keyboard-friendly navigation** — Previous / Next card controls

### 📋 All Cards View
- **Full card library** — Browse all flashcards in a responsive grid
- **Search** — Real-time search across questions and answers
- **Category pills** — Filter by category with visual active states
- **Favorites** — Star cards and filter to show only favorites
- **CRUD operations** — Add, edit, and delete cards via modal form
- **Lazy loading** — "Load More" pagination for large decks

### 🎨 Design & UX
- **Sketch-style UI** — Bold 2px borders, warm cream backgrounds, hand-drawn aesthetic
- **Dark mode** — Full dark theme with sun/moon toggle
- **Smooth animations** — Framer Motion card flips and staggered grid reveals
- **Responsive layout** — Works on mobile, tablet, and desktop
- **Color-coded categories** — Pink, mint, purple, yellow, coral accent colors

### 📊 Statistics Sidebar
- Total cards count
- Mastered / In Progress / Not Started breakdowns
- Color-coded stat cards with icons

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 (functional components + hooks) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 + custom design tokens |
| **State Management** | Zustand (with `persist` middleware for localStorage) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **UI Components** | shadcn/ui (Radix primitives) |
| **Build Tool** | Vite 5 |
| **Testing** | Vitest + Playwright |
| **Routing** | React Router DOM v6 |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AllCardsView.tsx      # Card library grid with search, filters, CRUD
│   ├── FlashcardForm.tsx     # Add/edit card modal form
│   ├── NavLink.tsx           # Navigation link component
│   ├── StudyMode.tsx         # Interactive study flashcard view
│   ├── StudyStats.tsx        # Statistics sidebar
│   └── ui/                   # shadcn/ui component library
├── data/
│   └── flashcards.ts         # Flashcard type definition + seed data
├── hooks/
│   ├── use-mobile.tsx        # Responsive breakpoint hook
│   └── use-toast.ts          # Toast notification hook
├── stores/
│   └── flashcardStore.ts     # Zustand store (state + actions)
├── pages/
│   ├── Index.tsx             # Main app page (layout + view toggle)
│   └── NotFound.tsx          # 404 page
├── lib/
│   └── utils.ts              # Utility functions (cn helper)
├── index.css                 # Global styles + design tokens (light/dark)
├── App.tsx                   # Router setup
└── main.tsx                  # App entry point
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **bun**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd flashmaster

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
# Unit tests
npm run test

# E2E tests (Playwright)
npx playwright test
```
