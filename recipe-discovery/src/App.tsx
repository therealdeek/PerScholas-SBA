import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages — we'll build each of these next
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";

// App.tsx is purely a routing map.
// Each <Route> pairs a URL pattern with a page component.
// The ":categoryName" and ":recipeId" segments are URL parameters —
// React Router will parse them and make them available via useParams().
// React Router docs: https://reactrouter.com/en/main/components/routes

function App() {
  return (
    <>
      {/* Navbar renders on EVERY page because it's outside <Routes> */}
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Catch-all: any unmatched route shows a simple not-found message */}
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>404 — Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
