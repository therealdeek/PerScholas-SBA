# 🍽️ Recipe Discovery App

A modern, responsive web application that lets you explore thousands of recipes from around the world.

Browse by category, search by name, view full cooking instructions, and save your favorites — all in one place.

Built as the Skills-Based Assessment for the Advanced React module at Per Scholas, this project demonstrates mastery of modern React development patterns including custom hooks, global state management, and client-side routing.

---

## 📸 What the App Looks Like

When you open the app you will land on the Browse Categories page — a grid of food categories like Beef, Chicken, Dessert, Seafood, and more.

Each card shows a photo and a short description. Clicking one takes you into that category where you can browse individual recipes.

Clicking a recipe opens the full detail page with ingredients, step-by-step instructions, and a link to a YouTube video if one is available.

A search bar in the navigation lets you find recipes by name from anywhere in the app.

A Favorites section lets you bookmark recipes you love, and they stay saved even after you close and reopen the browser.

---

## ✨ Features

- **Browse Categories** — Explore 14 food categories fetched live from the API

- **Category Pages** — See every recipe within a selected category

- **Recipe Detail Pages** — Full ingredients list, cooking instructions, origin country, and YouTube video link

- **Add to Favorites** — Save any recipe with one click

- **Persistent Favorites** — Your saved recipes stay saved after closing the browser

- **Search** — Find recipes by name using the navbar search bar

- **Loading States** — Animated spinner shown while data is being fetched

- **Error Handling** — Clear error messages if something goes wrong

- **Responsive Design** — Works on desktop, tablet, and mobile

- **Dark Theme** — Easy on the eyes with a clean dark UI

---

## 🛠️ Tech Stack

This app was built entirely with free, open-source tools. Here is what each one does:

| Tool | What It Does |
|---|---|
| React 18 | The JavaScript library that powers the UI |
| TypeScript | Adds type safety to JavaScript to catch bugs early |
| React Router v6 | Handles navigation between pages without reloading |
| Vite | The development server and build tool |
| TheMealDB API | Free public recipe API — no account or key required |

---

## 📂 Project Structure

If you are not familiar with reading code, here is a plain-English explanation of what each folder does:

```
recipe-discovery/
├── src/
│   ├── components/        # Small, reusable UI pieces used across multiple pages
│   │   ├── Navbar.tsx         → The top navigation bar with search
│   │   ├── RecipeCard.tsx     → A single recipe thumbnail card
│   │   ├── FavoriteCard.tsx   → A recipe card used on the Favorites page
│   │   ├── Spinner.tsx        → The loading animation
│   │   └── ErrorMessage.tsx   → Displays error messages to the user
│   │
│   ├── context/           # Global state — data shared across the whole app
│   │   └── FavoritesContext.tsx  → Manages the favorites list for every page
│   │
│   ├── hooks/             # Reusable logic extracted from components
│   │   ├── useFetch.ts        → Handles all API requests with loading/error states
│   │   └── useLocalStorage.ts → Keeps state in sync with the browser's storage
│   │
│   ├── pages/             # One file per page/route in the app
│   │   ├── HomePage.tsx       → The category grid (landing page)
│   │   ├── CategoryPage.tsx   → Recipes within a selected category
│   │   ├── RecipeDetailPage.tsx → Full recipe details
│   │   ├── FavoritesPage.tsx  → The user's saved favorites
│   │   └── SearchPage.tsx     → Search results
│   │
│   ├── types/             # TypeScript definitions — the "shape" of our data
│   │   └── index.ts
│   │
│   ├── App.tsx            # Defines all the routes (URL → Page mapping)
│   ├── main.tsx           # The app entry point — where everything starts
│   └── index.css          # All global styles and the design system
│
├── README.md              # This file
├── REFLECTION.md          # Developer reflection on the build process
└── package.json           # Lists all dependencies and available commands
```

---

## 🚀 How to Run the App Locally

Follow these steps exactly. You do not need any prior experience — just a computer with an internet connection.

### Step 1 — Install Node.js

This app runs on Node.js, a tool that lets your computer run JavaScript outside of a browser.

1. Go to [https://nodejs.org](https://nodejs.org)

2. Download the LTS version (the one labeled "Recommended for most users")

3. Run the installer and follow the prompts

4. When it finishes, open your Terminal (Mac) or Command Prompt (Windows) and type the following to confirm it installed correctly:

```bash
node --version
```

You should see something like `v18.x.x` or higher. If you do, you are ready.

---

### Step 2 — Download the Project

You need a copy of the project files on your computer. You can do this two ways:

**Option A — Using Git (recommended):**

If you have Git installed, open your Terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/recipe-discovery.git
```

**Option B — Download as ZIP:**

1. Go to the GitHub repository page

2. Click the green **Code** button

3. Click **Download ZIP**

4. Unzip the downloaded file somewhere on your computer

---

### Step 3 — Open the Project Folder

In your Terminal, navigate into the project folder:

```bash
cd recipe-discovery
```

> **Tip:** If you downloaded the ZIP and unzipped it to your Desktop, the command would be `cd Desktop/recipe-discovery`

---

### Step 4 — Install Dependencies

The project relies on several open-source packages. Install them all with one command:

```bash
npm install
```

This reads the `package.json` file and downloads everything the app needs. It may take a minute. You will see a `node_modules` folder appear when it is done — that is normal.

---

### Step 5 — Start the App

```bash
npm run dev
```

You will see output like this in your Terminal:

```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 6 — Open the App in Your Browser

Open any web browser and go to:

```
http://localhost:5173
```

The app will load. You do not need an internet connection beyond the initial API calls to TheMealDB, which happen automatically.

---

### Stopping the App

When you are done, go back to your Terminal and press:

```
Ctrl + C
```

This stops the development server.

---

## 🗺️ Pages and What to Expect

| URL | Page | What You Will See |
|---|---|---|
| `/` | Home | A grid of all recipe categories with photos |
| `/category/Chicken` | Category | All recipes in the Chicken category |
| `/recipe/52772` | Recipe Detail | Full recipe with ingredients and instructions |
| `/favorites` | Favorites | Your saved recipes (empty message if none saved) |
| `/search?query=pasta` | Search Results | Recipes matching your search term |

---

## 💡 How the Key Features Work

### No account or login required

The app uses TheMealDB, a completely free and public recipe API. No sign-up, no API key, no cost.

### Favorites persist after closing the browser

When you favorite a recipe, the app saves its ID to your browser's `localStorage` — a small built-in storage area every browser has. When you reopen the app, it reads from that storage and restores your list automatically.

### No page reloads when navigating

This is a Single-Page Application (SPA). When you click a link, React swaps out the content on screen without reloading the entire page. This makes navigation feel instant.

### Loading spinners

Every page that fetches data shows an animated spinner while it waits for the API to respond. If the API returns an error, a clear error message is shown instead of a broken page.