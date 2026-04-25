// src/pages/CategoryPage.tsx
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import type { MealSummary } from "../types";

// TheMealDB wraps filtered meals in a "meals" key
interface MealsResponse {
  meals: MealSummary[] | null;
}

function CategoryPage() {
  // useParams reads dynamic segments from the URL.
  // Since our route is /category/:categoryName, we destructure categoryName.
  // React Router types useParams as Record<string, string | undefined>
  // so we must handle the case where it could be undefined.
  // React Router docs: https://reactrouter.com/en/main/hooks/use-params
  const { categoryName } = useParams<{ categoryName: string }>();

  // Build the API URL from the URL param.
  // If categoryName is somehow undefined, we pass an empty string —
  // useFetch has a guard that skips fetching on empty URLs.
  const { data, loading, error } = useFetch<MealsResponse>(
    categoryName
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`
      : "",
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  // TheMealDB returns meals: null when a category has no results.
  // We handle this explicitly rather than letting it crash the map().
  if (!data?.meals) {
    return <ErrorMessage message={`No recipes found for "${categoryName}".`} />;
  }

  return (
    <section>
      {/* Back link — UX pattern: always give the user a way back */}
      <Link to="/" className="back-link">
        ← Back to Categories
      </Link>

      <h1 className="page-title">{categoryName}</h1>

      <div className="grid">
        {data.meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
